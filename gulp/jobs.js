const babelify = require('babelify');
const del = require('del');
const exec = require('child_process').exec;
const gulp = require('gulp');
const gulpBabel = require('gulp-babel');
const minifyJS = require('gulp-uglify');
const streamify = require('gulp-streamify');
const { babelifyConfig } = require('./configs');
const { buildOnly, errorReporter, getArg, logIf } = require('./utils');
const subProcess = require('./process');

const SERVER_PORT = 8080;
const SIM_PORT = 3000;

const SIM_DIR = getArg('simulator');
const server = subProcess({ cwd: '.', port: SERVER_PORT, cmd: 'node', args: ['server/build/server.js'] });
const simulator = subProcess({ cwd: SIM_DIR, port: SIM_PORT, cmd: 'rackup', args: ['-p', SIM_PORT] });

const jsTranspileServer = (config = {}) => () => {
  return gulp.src('server/src/**/*.js')
    .pipe(gulpBabel(babelifyConfig)
      .on('error', errorReporter(config)))
    .pipe(gulp.dest('server/build'))
};

const run = ({ cb, name, port, proc }) => done => {
  proc.run(done)
    .on('exit', status => {
      if (status) {
        console.error(`${name} failed to come up on port ${port}`);
        if (cb) cb(status);
      }
    }).on('stdout', message => logIf(name, message))
    .on('error', console.error);
};

const runServer = run({ name: 'SERVER', port: SERVER_PORT, proc: server });

const runSimulator = run({ name: 'SIMULATOR', port: SIM_PORT, proc: simulator, cb: process.abort });

const watchServer = () => {
  return gulp.watch('server/**/*.js', ['server:run']);
};

const watchSimulator = () => {
  return gulp.watch(`${SIM_DIR}/**/*.*`, ['simulator:run']);
};

module.exports = {
  'build': [['clean'], () => gulp.start(['js:buildServer'])],
  'clean': [() => del('server/build')],
  'js:buildServer': [jsTranspileServer({ build: true })],
  'js:transpileServer': [jsTranspileServer()],
  'js:watchServer': [() => gulp.watch('server/src/**/*.js', ['js:transpileServer'])],
  'server': [['js:watchServer'], () => gulp.start(['server:watch', 'simulator:watch'])],
  'server:run': [['js:transpileServer'], runServer],
  'server:watch': [['server:run'], watchServer],
  'simulator:run': SIM_DIR ? [runSimulator] : [() => 'skip'],
  'simulator:watch': SIM_DIR ? [['simulator:run'], watchSimulator] : [() => 'skip'],
  'transpile': [['js:transpileServer', 'js:watchServer']]
};
