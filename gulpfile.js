var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

gulp.task('less', function () {
  gulp.src('./public/less/*.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([autoprefixer, cssnano]))
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('views', function() {
  gulp.src('./src/views/**/*.html')
    .pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch('./public/less/*.less', ['less']);
  gulp.watch('./app/views/**/*.html', ['views']);
});

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js coffee html',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', [
  'less',
  'develop',
  'watch'
]);
