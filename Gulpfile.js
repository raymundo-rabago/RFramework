var gulp            = require('gulp'),
    postcss         = require('gulp-postcss'),
    sourcemaps      = require('gulp-sourcemaps'),
    autoprefixer    = require('autoprefixer'),
    lost            = require('lost'),
    cssnext         = require('cssnext'),
    concat          = require('gulp-concat'),
    rename          = require('gulp-rename'),
    uglify          = require('gulp-uglify'),
    jade            = require('gulp-jade'),
    browserSync     = require('browser-sync');


// main controller tasks
gulp.task('default', ['watch', 'browser-sync']);


// Live reload server
gulp.task('browser-sync', function() {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "./"
        }
    });
});


// watch tasks
gulp.task('watch', function () {
    gulp.watch(['views/*'], ['templates']);
    gulp.watch(['css/**/*'], ['css']);
    gulp.watch(['js/*/*'], ['js']);
});


// JavaScript
gulp.task('js', function() {
  return gulp.src('js/libs/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(rename( {suffix:".min"} ))
    .pipe(gulp.dest('js'));
});


// CSS
gulp.task("css", function() {
    var processors = [
        lost(),
        cssnext({ 'compress': false }),
        autoprefixer()
    ];
    return gulp.src('css/app.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(rename( {suffix: ".min"} ))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('css'));
});


// html
gulp.task('templates', function() {
  return gulp.src('views/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./'))
});
