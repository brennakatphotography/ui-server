const babelify = require('babelify');
const browserify = require('browserify');
const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const minifyCSS = require('gulp-clean-css');
const minifyJS = require('gulp-uglify');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');
const streamify = require('gulp-streamify');
const { babelifyConfig, browserifyConfig, browserSyncConfig } = require('./configs');
const { buildOnly, getArg, errorReporter } = require('./utils');
const SIMULATOR_DIR = getArg('simulator');
const simulator = require('./simulator')(SIMULATOR_DIR);

const browserInit = () => {
  if (SIMULATOR_DIR) {
    return [['transpile', 'simulator:watch'], browserSyncInit];
  }
  return [['transpile'], browserSyncInit];
};

const browserSyncInit = () => browserSync.init(browserSyncConfig);

const jsTranspile = (config = {}) => () => {
  return browserify(browserifyConfig)
    .transform(babelify.configure(babelifyConfig))
    .bundle()
    .on('error', errorReporter(config))
    .pipe(source('app.js'))
    .pipe(buildOnly(config.build, streamify, minifyJS()))
    .pipe(gulp.dest('public/js'));
};

const reloadServer = () => {
  return gulp.watch('src/**/*.*', [browserSync.reload]);
};

const runServer = done => {
  simulator.run(done).on('exit', status => {
    if (status) {
      console.error('Simulator failed to come up on port 3000.');
      process.abort(status);
    }
  });
};

const watchSimulator = () => {
  return gulp.watch(`${SIMULATOR_DIR}/**/*.*`, ['simulator:run', browserSync.reload]);
};

const sassTranspile = (config = {}) => () => {
  return gulp.src('src/scss/main.scss')
    .pipe(sass().on('error', errorReporter(config)))
    .pipe(buildOnly(config.build, minifyCSS))
    .pipe(gulp.dest('public/css'));
};

module.exports = {
  'build': [['js:build', 'sass:build']],
  'browser:init': browserInit(),
  'js:build': [jsTranspile({ build: true })],
  'js:transpile': [jsTranspile()],
  'js:watch': [() => gulp.watch('src/js/**/*.js', ['js:transpile'])],
  'sass:build': [sassTranspile({ build: true })],
  'sass:transpile': [sassTranspile()],
  'sass:watch': [() => gulp.watch('src/scss/**/*.scss', ['sass:transpile'])],
  'server': [['browser:init', 'js:watch', 'sass:watch'], reloadServer],
  'simulator:run': SIMULATOR_DIR && [runServer],
  'simulator:watch': SIMULATOR_DIR && [['simulator:run'], watchSimulator],
  'transpile': [['js:transpile', 'sass:transpile', 'js:watch', 'sass:watch']]
};
