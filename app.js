const browserSync = require("browser-sync").create();

browserSync.init({
    "server": ["app"],
    "port": 63342,
    "proxy": false,
    "files": ["app/index.html", "app/*.css", "app/src/**/*.js", "app/img/*.png", "app/img/*.jpeg"],
    "ghostMode": false,
    "reloadDelay": 10,
    "reloadDebounce": 800,
    "injectChanges": false,
    "minify": false,
    "open": true,
    "notify": false,
});