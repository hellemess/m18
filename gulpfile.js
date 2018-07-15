const gulp = require('gulp');
const server = require('browser-sync').create();
const plumber = require('gulp-plumber');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const postcssPresetEnv = require('postcss-preset-env');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');
const imagemin = require('gulp-imagemin');
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

// images

gulp.task('images', () => {
  return gulp.src('source/images/**/*.{gif,jpg,png,svg}')
  .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest('build/images'))
  .pipe(server.stream());
});

// video

gulp.task('video', () => {
  return gulp.src('source/video/*.{mp4,ogv,webm}')
    .pipe(gulp.dest('build/video'))
    .pipe(server.stream());
});

// build

gulp.task('clear', () => {
  return del('build');
});

gulp.task('build', () => {
  run(
    'clear',
    'images',
    'video',
    'fonts',
    'less',
    'html'
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

  gulp.watch('source/images/*.{gif,jpg,png,svg}', ['images']);
  gulp.watch('source/images/*.{mp4,ogv,webm}', ['video']);
  gulp.watch('source/fonts/*.woff', ['fonts']);
  gulp.watch('source/less/**/*.less', ['less']);
  gulp.watch('source/*.html', ['update']);
});
