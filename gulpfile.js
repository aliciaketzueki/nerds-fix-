var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var browserSync = require("browser-sync").create();
var rename = require("gulp-rename");
var svgstore = require("gulp-svgstore");

gulp.task("style", function() {
  gulp.src("source/less/style.less")
  .pipe(plumber())
  .pipe(less())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(gulp.dest("source/css"))
  .pipe(browserSync.stream());
});

gulp.task("serve", ["style"], function() {
  browserSync.init({
    server: "source/",
  });
  gulp.watch("source/less/**/*.less", ["style"]);
  gulp.watch("source/*.html").on("change", browserSync.reload);
});

gulp.task("sprite", function () {
  return gulp.src("source/img/**/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("source/img"));
});
