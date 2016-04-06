// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var spritesmith = require('gulp.spritesmith');
var browserify = require('gulp-browserify');

//sprites
//gulp.task('sprites', function () {
//  var spriteData = gulp.src('./src/sprites/*').pipe(spritesmith({
//    algorithm: 'binary-tree',
//    imgName: 'spriteTech.png',
//    cssName: '../../../src/scss/include/_spritesmith.scss',
//    imgPath: '../img/icons/spriteTech.png',
//    cssFormat: 'scss',
//    padding: 5
//  }));
//  spriteData
//    .pipe(gulp.dest('prod/img/icons'));
//});
//browserify
gulp.task('scripts', function() {
  // Single entry point to browserify
  gulp.src('src/js/index.js')
    .pipe(browserify({}))
    .pipe(gulp.dest('./build/js'))
});
//gulp.task('scripts', function() {
//    return gulp.src('src/js/js/*.js')
//      .pipe(concat('index.js'))
//      .pipe(gulp.dest('prod/js'))
//});

// Static server and Watch Files For Changes
gulp.task('watch', function() {
  //browserSync.init({
  //  server: {
  //    baseDir: "./prod/"
  //  }
  //});
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch(['src/scss/**/*.scss','src/scss/**/*.sass'], ['sass']);
});
// Lint Task
//gulp.task('hint', function() {
//    return gulp.src('prod/js/*.js')
//        .pipe(jshint())
//        .pipe(jshint.reporter('default'));
//});

// Compile Our Sass
gulp.task('sass', function() {
  return gulp.src('src/scss/style.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('./build/css'));
});

// Concatenate & Minify JS
gulp.task('scripts-lib', function() {
  return gulp.src('src/js/lib/*.js')
    .pipe(concat('lib.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});
//gulp.task('scripts', function() {
//    return gulp.src('src/js/js/*.js')
//      .pipe(concat('index.js'))
//      .pipe(gulp.dest('prod/js'))
//});

// Default Task
gulp.task('default', ['sass', 'scripts-lib', 'scripts', 'watch']);