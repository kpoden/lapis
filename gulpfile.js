const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const { deleteAsync } = require('del');
const newer = require('gulp-newer');
const plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');

const paths = {
  src: 'src',
  dist: 'dist',
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css/'
  },
  html: {
    src: 'src/**/*.html',
    dest: 'dist/'
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'dist/scripts/'
  },
  images: {
    src: 'src/images/**/*',
    dest: 'dist/images/'
  },
  assets: {
    src: 'src/assets/**/*',
    dest: 'dist/assets/'
  }
};

// Очистка dist
function clean() {
  return deleteAsync([paths.dist]);
}

// Сборка стилей (без минификации)
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(plumber()) // Добавляем обработчик ошибок
    .pipe(sass({
      outputStyle: 'expanded', // Сохраняем читаемое форматирование
      sourceComments: true    // Сохраняем комментарии
    }).on('error', sass.logError))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// Копирование HTML
function html() {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
}

// Копирование JS
function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// Копирование изображений
function images() {
  return gulp.src('src/images/**/*', { encoding: false })
    .pipe(newer('dist/images')) // Только новые/изменённые
    // .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest('dist/images/'));
}
// Копирование изображений
function assets() {
  return gulp.src(paths.assets.src, { encoding: false })
    .pipe(gulp.dest(paths.assets.dest))
    .pipe(browserSync.stream());
}

// Сервер + слежка
function serve() {
  browserSync.init({
    server: {
      baseDir: paths.dist
    },
    notify: false
  });

  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.assets.src, assets);
}

// Билд
const build = gulp.series(clean, gulp.parallel(html, styles, scripts, images, assets));

exports.default = gulp.series(build, serve);
exports.build = build;
