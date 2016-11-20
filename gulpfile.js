const { forEach } = require('fun-util');
const gulp = require('gulp');
const jobs = require('./gulp/jobs');

forEach(jobs, (args, job) => {
  if (args) {
    console.log('adding task...', job);
    gulp.task(job, ...args);
  } else {
    console.log('skipping task...', job);
  }
});

gulp.task('default', ['build']);
