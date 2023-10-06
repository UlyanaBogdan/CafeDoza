const browserSync = require("browser-sync").create();

browserSync.init({
    "server": ["app/src"],
    "startPath": "index.html",
    "port": 3000,
    "proxy": false,
    "files": ["app/src/index.html", "app/src/css/*.css", "app/src/**/*.js", "app/src/img/*.png", "app/src/img/*.jpeg"],
    "ghostMode": false,
    "reloadDelay": 10,
    "reloadDebounce": 800,
    "injectChanges": false,
    "minify": false,
    "open": true,
    "notify": false,
});

// var gulp        = require('gulp');
// var browserSync = require('browser-sync').create();
// var reload      = browserSync.reload;
//
// // Save a reference to the reload method
//
// // Watch scss AND html files, doing different things with each.
// gulp.task('serve', function () {
//
//     // Serve files from the root of this project
//     browserSync.init({
//         // server: {
//         //     baseDir: "./",
//         // },
//         "server": ["app/src"],
//         "startPath": "index.html",
//         "port": 3000,
//         "proxy": false,
//         "files": ["app/src/index.html", "app/src/css/*.css", "app/src/**/*.js", "app/src/img/*.png", "app/src/img/*.jpeg"],
//         "ghostMode": false,
//         "reloadDelay": 10,
//         "reloadDebounce": 800,
//         "injectChanges": false,
//         "minify": false,
//         "open": true,
//         "notify": false,
//     });
//
//     gulp.watch("*.html").on("change", reload);
// });