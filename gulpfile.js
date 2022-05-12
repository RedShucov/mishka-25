import gulp from 'gulp';
import browser from 'browser-sync';
import nunjucks from 'gulp-nunjucks-render'
import htmlmin from 'gulp-htmlmin';
import formatHtml from 'gulp-format-html';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';

//HTML

const html = () => {
  return gulp.src('source/templates/pages/*.njk')
    .pipe(nunjucks({
      path: ['source/templates']
    }))
    .pipe(htmlmin(
      { collapseWhitespace: true }))
    .pipe(formatHtml())
    .pipe(gulp.dest('build/'))
}

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
    browser: "firefox"
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/**/*.njk').on('change', browser.reload);
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/templates/**/*.njk', gulp.series(html));
}


export default gulp.series(
  html, styles, server, watcher
);
