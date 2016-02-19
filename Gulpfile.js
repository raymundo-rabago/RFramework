var browserSync     = require('browser-sync').create(),
    gulp            = require('gulp'),
    postcss         = require('gulp-postcss'),
    cssimport       = require('postcss-partial-import'),
    cssnest         = require('postcss-nesting'),
    cssnext         = require('postcss-cssnext'),
    mqpacker        = require('css-mqpacker'),
    cssnano         = require('cssnano'),
    concat          = require('gulp-concat'),
    rename          = require('gulp-rename'),
    uglify          = require('gulp-uglify'),
    jade            = require('gulp-jade');



// html
gulp.task('views', function() {
  return gulp.src('views/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./'))
});

// CSS
gulp.task("css", function() {
  return gulp.src('css/app.css')
    .pipe(postcss([
      cssimport(),
      cssnest(),
      cssnext({ autoprefixer: {browsers: ['last 4 version']} }),
      mqpacker(),
      cssnano()
    ]))
    .pipe(rename( {suffix: ".min"} ))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

// JavaScript
gulp.task('js', function() {
  return gulp.src('js/libs/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(rename( {suffix:".min"} ))
    .pipe(gulp.dest('js'))
    .pipe(browserSync.stream());
});


// Live reload server
gulp.task('server', function() {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "./"
        }
    });
});

// watch tasks
gulp.task('watch', function () {
    gulp.watch(['./css/**/*.css'], ['css']);
    gulp.watch(['./js/*/*.js'], ['js']);
    gulp.watch(['./views/**/**/*.jade'], ['views']);
    gulp.watch('./*.html').on('change', browserSync.reload);
});

// main controller tasks
gulp.task('default', ['watch', 'server']);
