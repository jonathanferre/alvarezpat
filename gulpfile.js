const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass");
const sync = require("browser-sync").create();

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

function browserSync(cb) {
  sync.init({
    server: {
      baseDir: "./app",
    },
  });

  watch("app/scss/main.scss", generateCSS);
  watch("./app/**.html").on("change", sync.reload);
  cb();
}

exports.css = generateCSS;
exports.watch = watchSCSS;
exports.sync = browserSync;
