// #### variabuls ###

var nameProject = "reserved-fly"

// ### and variabuls ###

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload

gulp.task('sass', done => {
return gulp.src('./src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src//build/'))
    .pipe(browserSync.stream())
});

gulp.task('watch', function(){
    gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
    browserSync.reload();
});

gulp.task('browser-sync', () => {
    browserSync.init({
        proxy: 'http://localhost/' + nameProject + '/src'
    });

    gulp.watch('**/*.php').on("change", reload);
    gulp.watch('**/*.js').on("change", reload);
    gulp.watch('**/*.css').on("change", reload);

});

gulp.task('default', gulp.parallel(
    'sass',
    'watch',
    'browser-sync'
));