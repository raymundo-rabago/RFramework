var gulp        = require("gulp"),
    postcss     = require("gulp-postcss"),
    lost        = require('lost'),
    cssnext     = require("cssnext"),
    cssimport   = require("postcss-import"),
    cssnested   = require('postcss-nested'),
    concat      = require("gulp-concat"),
    rename      = require('gulp-rename'),
    uglify      = require('gulp-uglify'),
    jade        = require('gulp-jade'),
    browserSync = require('browser-sync');

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
    gulp.watch(['./*'], ['templates']);
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
        cssimport(),
        cssnested(),
        csslost(),
        cssnext({ 'compress': true }),
    ];
    return gulp.src('css/libs/app.css')
        .pipe(postcss(processors))
        .pipe(rename( {suffix: ".min"} ))
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
