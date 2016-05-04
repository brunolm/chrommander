var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('build', shell.task('tsc'))

gulp.task('watch', ['build'], function () {
  gulp.watch('*/**/*.ts', ['build']);
});

gulp.task('test', shell.task('npm test'));

gulp.task('clean', shell.task('npm run clean'));
gulp.task('rebuild', [ 'clean', 'build' ]);