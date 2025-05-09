const gulp = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const rimraf = require('gulp-rimraf');
const rename = require('gulp-rename');

const minify = require('gulp-minify');
const cp = require('gulp-copy');

// build sass
gulp.task('compile-sass', function () {
  return gulp.src('src/css/build.scss') // Path to your SASS files
    .pipe(sass({
      outputStyle: 'compressed',
      precision: 3,
      silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'color-functions'],
      quietDeps: true,
      includePaths: ['node_modules/']
    }).on('error', console.error))
    .pipe(gulp.dest('dist')); // Output directory for CSS files
});
gulp.task('rename-css', function () {
  return gulp.src('dist/build.css') // Path to your CSS file
    .pipe(rimraf())
    .pipe(rename('senux.min.css'))
    .pipe(gulp.dest('dist')); // Output directory for CSS file
});
gulp.task('sass', gulp.series('compile-sass', 'rename-css'));


// build js
gulp.task('compile-js', function () {
  return gulp.src('customisations.js') // Path for your JS files
    .pipe(minify({
      ext: {
        min: '.min.js'
      }
    }))
    .pipe(gulp.dest('dist')); // Output directory for JS file
});
gulp.task('rm-js', function () {
  return gulp.src('dist/customisations.js') // Path to your CSS file
    .pipe(rimraf());
});
gulp.task('rename-min-js', function () {
  return gulp.src('dist/customisations.min.js') // Path to your CSS file
    .pipe(rimraf())
    .pipe(rename('senux.min.js'))
    .pipe(gulp.dest('dist')); // Output directory for CSS file
});
gulp.task('js', gulp.series('compile-js', 'rm-js', 'rename-min-js'));


// watch sass
gulp.task('watch-sass', function () {
  gulp.watch('src/css/build.scss', gulp.series('compile-sass', 'rename-css'));
});
