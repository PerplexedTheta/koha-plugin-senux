const gulp = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

const minify = require('gulp-minify');

// build sass
gulp.task('compile-sass', function () {
  return gulp.src('src/css/build.scss') // Path to your SASS files
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      precision: 3,
      silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'color-functions'],
      quietDeps: true,
      includePaths: ['node_modules/']
    }).on('error', console.error))
    .pipe(rename('senux.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist')); // Output directory for CSS files
});
gulp.task('sass', gulp.series('compile-sass'));


// build js
gulp.task('compile-js', function () {
  return gulp.src('customisations.js') // Path for your JS files
    .pipe(minify({
      noSource: true
    }))
    .pipe(rename('senux.min.js'))
    .pipe(gulp.dest('dist')); // Output directory for JS file
});
gulp.task('js', gulp.series('compile-js'));


// watch sass
gulp.task('watch-sass', function () {
  gulp.watch('src/css/build.scss', gulp.series('compile-sass'));
});
