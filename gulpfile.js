var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var browserSync = require("browser-sync").create();
var rename = require("gulp-rename");
var svgstore = require("gulp-svgstore");

var csso = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var del = require("del");
var uglify = require("gulp-uglify");
var pump = require("pump");
var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
var htmlmin = require("gulp-htmlmin");
var run = require("run-sequence");

//стили
gulp.task("style", function() {
  gulp.src("source/less/style.less")
  .pipe(plumber())
  .pipe(less())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(csso({
    restructure: false,
    sourceMap: true,
    debug: true
  }))
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("build/css"))
});

//стрим сервера
gulp.task("serve", function() {
  browserSync.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  gulp.watch("source/less/**/*.less", ["style"]);
  gulp.watch("source/*.html");
});

// изображения
gulp.task("imagemin", function() {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
});

gulp.task("webp", function() {
  gulp.src("source/img/**/*.{jpg,png}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"))
});

gulp.task("sprite", function () {
  return gulp.src("source/img/**/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("images", function(done) {
  run("imagemin", "webp", "sprite", done);
});

//скрипты
gulp.task("minjs", function(cb) {
  pump([
    gulp.src("source/js/**/*.js"),
    uglify(),
    rename({
      suffix: ".min"
    }),
    gulp.dest("source/js")
  ],
    cb
  );
});

gulp.task("js", function () {
  return gulp.src("source/js/**/*min.js")
    .pipe(sourcemaps.init())
    .pipe(concat("mainjs.min.js"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("build/js"));
});

//html
gulp.task("minhtml", function () {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
});

//build
gulp.task("clean", function() {
  return del("build");
});

gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/**",
    "source/img/**",
    "source/js/**"
  ]);
});

gulp.task("build", function(done) {
  run("clean", "copy", "style", "images", "js", "minhtml", done);
});
