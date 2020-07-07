const { src, dest, watch, parallel } = require("gulp");
const sass = require("gulp-sass");
const sync = require("browser-sync").create();
const sourcemaps = require("gulp-sourcemaps");

function generateCSS(cb) {
  src("app/scss/main.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("app/css"))
    .pipe(sync.stream());
  cb();
}

function watchSCSS(cb) {
  watch("app/scss/main.scss", generateCSS);
  cb();
}

function generateMaps(cb) {
  src("app/scss/main.scss")
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("app/css"))
    .pipe(sync.stream());
  cb();
}

function browserSync(cb) {
  sync.init({
    server: {
      baseDir: "./app",
    },
  });

  watch("app/scss/main.scss", generateCSS);
  watch("app/scss/main.scss", generateMaps);
  watch("./app/**.html").on("change", sync.reload);
  cb();
}

exports.css = generateCSS;
exports.watch = watchSCSS;
exports.sync = browserSync;
exports.sourcemaps = generateMaps;
