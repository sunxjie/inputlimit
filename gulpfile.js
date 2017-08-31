var gulp = require('gulp'),
    del = require('del'),
    less = require('gulp-less'),
    cssminify = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create();

// 源文件目录
var _src = {
    js:         'src/js/',
    less:       'src/less/',
    html:       'src/html/',
};

// 构建目录
var _dist = {
    rootPath:   'dist/',
    jsPath:     'dist/js/',
    cssPath:    'dist/css/',
};

// less
gulp.task('less', function() {
    return gulp.src(_src.less + '*.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 5 iOS versions'],
            cascade: true,
            remove: false
        }))
        .pipe(gulp.dest(_dist.cssPath))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cssminify())
        .pipe(gulp.dest(_dist.cssPath))
});

// js
gulp.task('scripts', function() {
    return gulp.src(_src.js + '*.js')
        .pipe(gulp.dest(_dist.jsPath))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(_dist.jsPath))
});

// 处理 html
gulp.task('html', function() {
    gulp.src(_src.html + '**/*.html')
        .pipe(gulp.dest(_dist.rootPath));
});

// 清除构建文件
gulp.task('clean', function() {
    del(_dist.rootPath);
});

gulp.task('default', ['less', 'scripts', 'html'], function() {
    gulp.start('browser-sync');
});

// 同步刷新
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: _dist.rootPath,
            directory: true
        }
    });
    gulp.watch(_src.js + '/**/*', ['scripts']);
    gulp.watch(_src.less + '/**/*', ['less']);
    gulp.watch(_src.html + '/**/*', ['html']);
    gulp.watch(_dist.rootPath + '/**/*').on('change', browserSync.reload);
});