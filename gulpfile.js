// #### variabuls ###

var nameProject = "reserved-fly"

// ### and variabuls ###

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    webpackConfig = require('./webpack.config.js'),
    reload = browserSync.reload

gulp.task('sass', done => {
return gulp.src('./src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('.//dist/css'))
    .pipe(browserSync.stream())
});

gulp.task('watch',  () => {
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
    browserSync.reload();
});

gulp.task('browser-sync', () => {
    browserSync.init({
        proxy: 'http://localhost/' + nameProject
    });

    gulp.watch('**/*.php').on("change", reload);
    gulp.watch('**/*.js').on("change", reload);
    gulp.watch('**/*.css').on("change", reload);

});

gulp.task('webpack', () => {
    gulp.src('./src/js/main.js')
      .pipe(webpackStream(webpackConfig), webpack)
      .pipe(gulp.dest('./dist/js'));
});

gulp.task('default', gulp.parallel(
    'webpack',
    'watch',
    'sass',
    'browser-sync'
));