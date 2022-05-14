var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var autoprefixer = require("autoprefixer");
var mainBowerFiles = require("main-bower-files");
var browserSync = require("browser-sync").create();
var minimist = require("minimist");
var pugI18n = require("gulp-i18n-pug");

var envOptions = {
  sting: "env",
  default: { env: "develop" },
};

var options = minimist(process.argv.slice(2), envOptions);

gulp.task("clean", function () {
  return gulp
    .src(
      $.if(
        options.env === "production",
        [("./.tmp", "./dist")],
        [("./.tmp", "./public")]
      ),
      {
        read: false,
        allowEmpty: true,
      }
    )
    .pipe($.clean());
});

gulp.task("pugI18n", function () {
  var i18nOptions = {
    i18n: {
      dest: "dist",
      locales: "locales/*.*", // 語系檔位置
      namespace: "$t", // 前綴，預設為$i18n
      localeExtension: false, // 編譯後資料夾格式，false為依照資料夾，true為xxx.en.html
    },
    pretty: true,
  };
  return gulp
    .src("./source/views/**/*.pug")
    .pipe(pugI18n(i18nOptions))
    .pipe(
      $.if(
        options.env === "production",
        gulp.dest("./dist/"),
        gulp.dest("./public/")
      )
    )
    .pipe(browserSync.stream());
});

gulp.task("pug", function () {
  return gulp
    .src("./source/views/**/*.pug")
    .pipe($.plumber())
    .pipe(
      $.pug({
        pretty: true,
      })
    )
    .pipe(
      $.if(
        options.env === "production",
        gulp.dest("./dist/"),
        gulp.dest("./public/")
      )
    )
    .pipe(browserSync.stream());
});

gulp.task("sass", function () {
  return (
    gulp
      .src("./source/sass/**/*.sass")
      .pipe($.plumber())
      .pipe($.sourcemaps.init())
      .pipe($.sass().on("error", $.sass.logError))
      // 編譯完成
      .pipe($.postcss([autoprefixer()]))
      .pipe($.if(options.env === "production", $.cleanCss()))
      .pipe($.sourcemaps.write("."))
      .pipe(
        $.if(
          options.env === "production",
          gulp.dest("./dist/css"),
          gulp.dest("./public/css")
        )
      )
      .pipe(browserSync.stream())
  );
});

gulp.task("babel", () =>
  gulp
    .src("./source/js/**/*.js")
    .pipe($.sourcemaps.init())
    .pipe(
      $.babel({
        presets: ["@babel/env"],
      })
    )
    .pipe($.concat("all.js"))
    .pipe(
      $.if(
        options.env === "production",
        $.uglify({
          compress: {
            drop_console: true,
          },
        })
      )
    )
    .pipe($.sourcemaps.write("."))
    .pipe(
      $.if(
        options.env === "production",
        gulp.dest("./dist/js"),
        gulp.dest("./public/js")
      )
    )
    .pipe(browserSync.stream())
);

gulp.task("bower", function () {
  return gulp
    .src(
      mainBowerFiles({
        overrides: {
          vue: {
            // 套件名稱
            main: "dist/vue.js", // 取用的資料夾路徑
          },
        },
      })
    )
    .pipe(gulp.dest("./.tmp/vendors"));
  cb(err);
});

gulp.task("vendorJs", function () {
  return gulp
    .src("./.tmp/vendors/**/*.js")
    .pipe($.concat("vendors.js"))
    .pipe($.if(options.env === "production", $.uglify()))
    .pipe(
      $.if(
        options.env === "production",
        gulp.dest("./dist/js"),
        gulp.dest("./public/js")
      )
    );
});

gulp.task("image-min", function () {
  return gulp
    .src("./source/images/*")
    .pipe($.if(options.env === "production", $.imagemin()))
    .pipe(
      $.if(
        options.env === "production",
        gulp.dest("./dist/images"),
        gulp.dest("./public/images")
      )
    );
});

gulp.task("deploy", function () {
  return gulp.src("./dist/**/*").pipe($.ghPages());
});

gulp.task("clean-publish", function () {
  return gulp
    .src(["./.publish"], {
      read: false,
      allowEmpty: true,
    })
    .pipe($.clean());
});

gulp.task(
  "build",
  gulp.series(
    "clean",
    "bower",
    "vendorJs",
    gulp.parallel("pugI18n", "sass", "babel", "image-min")
  )
);

gulp.task(
  "default",
  gulp.series(
    "clean",
    "bower",
    "vendorJs",
    gulp.parallel("pugI18n", "sass", "babel", "image-min"),
    function (done) {
      browserSync.init({
        server: {
          baseDir: "./public",
          reloadDebounce: 2000, //重新整理的間隔必須超過 2 秒
        },
      });

      gulp.watch("./source/sass/**/*.sass", gulp.series("sass"));
      gulp.watch("./source/js/**/*.js", gulp.series("babel"));
      gulp.watch("./source/**/*.pug", gulp.series("pugI18n"));
      gulp.watch("./locales/*.json", gulp.series("pugI18n"));

      done();
    }
  )
);
