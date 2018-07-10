const gulp = require('gulp');
const server = require('browser-sync').create();
const plumber = require('gulp-plumber');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const postcssPresetEnv = require('postcss-preset-env');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');
const svgmin = require('gulp-svgmin');
const del = require('del');
const run = require('run-sequence');

// html

gulp.task('html', () => {
  return gulp.src('source/*.html')
    .pipe(gulp.dest('build'))
    .pipe(server.stream());
});

// less

gulp.task('less', () => {
  return gulp.src('source/less/style.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      postcssPresetEnv({
        stage: 4
      }),
      autoprefixer
    ]))
    .pipe(csso())
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

// fonts

gulp.task('fonts', () => {
  return gulp.src('source/fonts/*.woff')
    .pipe(gulp.dest('build/fonts'))
    .pipe(server.stream());
});

// svg

gulp.task('svg', () => {
  return gulp.src('source/images/**/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('build/images'))
    .pipe(server.stream());
});

// build

gulp.task('clear', () => {
  return del('build');
});

gulp.task('build', (fn) => {
  run(
    'clear',
    'svg',
    'fonts',
    'less',
    'html',
    fn
  );
});

// watch

gulp.task('update', ['html'], () => {
  server.reload();
})

gulp.task('watch', () => {
  server.init({
    notify: false,
    server: 'build/'
  });

  gulp.watch('source/images/*.svg', ['svg']);
  gulp.watch('source/fonts/*.woff', ['fonts']);
  gulp.watch('source/less/**/*.less', ['less']);
  gulp.watch('source/*.html', ['update']);
});
