var gulp = require('gulp'),
        connect = require('gulp-connect');

gulp.task('serve', function() {
    connect.server();
    /*
    *
    * Use for connecting to network ip to test on mobile devices
    connect.server({
        host : '192.168.0.12',
        livereload: true
    });*/
});

gulp.task('default', ['serve']);
