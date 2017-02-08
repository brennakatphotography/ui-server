const babelify = require('babelify');
const browserify = require('browserify');
const browserSync = require('browser-sync').create();
const exec = require('child_process').exec;
const gulp = require('gulp');
const gulpBabel = require('gulp-babel');
const minifyCSS = require('gulp-clean-css');
const minifyJS = require('gulp-uglify');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');
const streamify = require('gulp-streamify');
const { babelifyConfig, browserifyConfig, browserSyncConfig } = require('./configs');
const { buildOnly, errorReporter, getArg, logIf } = require('./utils');
const subProcess = require('./process');

const SIM_DIR = getArg('simulator');
const server = subProcess({ cwd: '.', port: 8080, cmd: 'node', args: ['server/build/server.js'] });
const simulator = subProcess({ cwd: SIM_DIR, port: 3000, cmd: 'rackup', args: ['-p', '3000'] });

const browserInit = () => {
  if (SIM_DIR) {
    return [['transpile', 'server:watch', 'simulator:watch'], browserSyncInit];
  }
  return [['transpile', 'server:watch'], browserSyncInit];
};

const browserSyncInit = () => {
  exec('open http://localhost:8080');
  browserSync.init(browserSyncConfig)
};

const jsTranspileClient = (config = {}) => () => {
  return browserify(browserifyConfig)
    .transform(babelify.configure(babelifyConfig))
    .bundle()
    .on('error', errorReporter(config))
    .pipe(source('app.js'))
    .pipe(buildOnly(config.build, streamify, minifyJS()))
    .pipe(gulp.dest('client/build/js'));
};

const jsTranspileServer = (config = {}) => () => {
  return gulp.src('server/src/**/*.js')
    .pipe(gulpBabel(babelifyConfig)
      .on('error', errorReporter(config)))
    .pipe(gulp.dest('server/build'))
};

const refreshBrowser = () => {
  return gulp.watch(['client/src/**/*.*', 'server/src/**/*.*'], [browserSync.reload]);
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

const runServer = run({ name: 'SERVER', port: 8080, proc: server });

const runSimulator = run({ name: 'SIMULATOR', port: 3000, proc: simulator, cb: process.abort });

const watchServer = () => {
  return gulp.watch('server/**/*.js', ['server:run', browserSync.reload]);
};

const watchSimulator = () => {
  return gulp.watch(`${SIM_DIR}/**/*.*`, ['simulator:run', browserSync.reload]);
};

const sassTranspile = (config = {}) => () => {
  return gulp.src('client/src/scss/main.scss')
    .pipe(sass().on('error', errorReporter(config)))
    .pipe(buildOnly(config.build, minifyCSS))
    .pipe(gulp.dest('client/build/css'));
};

module.exports = {
  'build': [['js:buildClient', 'js:buildServer', 'sass:build']],
  'browser:init': browserInit(),
  'js:buildClient': [jsTranspileClient({ build: true })],
  'js:buildServer': [jsTranspileServer({ build: true })],
  'js:transpileClient': [jsTranspileClient()],
  'js:transpileServer': [jsTranspileServer()],
  'js:watchClient': [() => gulp.watch('client/src/js/**/*.js', ['js:transpileClient'])],
  'js:watchServer': [() => gulp.watch('server/src/**/*.js', ['js:transpileServer'])],
  'sass:build': [sassTranspile({ build: true })],
  'sass:transpile': [sassTranspile()],
  'sass:watch': [() => gulp.watch('client/src/scss/**/*.scss', ['sass:transpile'])],
  'server': [['browser:init', 'js:watchClient', 'js:watchServer', 'sass:watch'], refreshBrowser],
  'server:run': [['js:transpileServer'], runServer],
  'server:watch': [['server:run'], watchServer],
  'simulator:run': SIM_DIR && [runSimulator],
  'simulator:watch': SIM_DIR && [['simulator:run'], watchSimulator],
  'transpile': [['js:transpileClient', 'js:transpileServer', 'sass:transpile', 'js:watchClient', 'js:watchServer', 'sass:watch']]
};
