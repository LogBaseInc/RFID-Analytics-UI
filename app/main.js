require.config({
    urlArgs: '5.5',
    waitSeconds: 0,
    paths: {
        angular: '../bower_components/angular/angular',
        angularAMD: '../bower_components/angularAMD/angularAMD',
        'angular-animate': '../bower_components//angular-animate/angular-animate',
        'angular-route': '../bower_components/angular-route/angular-route',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
        ngMessages: '../bower_components/angular-messages/angular-messages',
        jquery: '../bower_components/jquery/dist/jquery',
        'config.route': 'config.route',
        'spinner': 'scripts/spin',
        'toaster' :'../bower_components/angularjs-toaster/toaster',
        'utility' : 'views/component/utility',
        'fileupload' : '../bower_components/ng-file-upload/ng-file-upload.min',
    },
    shim: {
        angular: {
            deps: ['jquery'],
            exports: 'angular',
        },
        'angularAMD': ['angular'],
        'angular-animate': ['angular'],
        'angular-route': ['angular'],
        'ngMessages': ['angular'],
        bootstrap: {
            deps: ["jquery"]
        },

        jquery: {
            exports: 'jQuery'
        },
        
         "spinner": {
            exports: 'Spinner'
        },
        'toaster': ['angular','angular-animate'],
        'fileupload' : ['angular']
    },
});

require(["infrastructure"], function () {
    require(["app"], function (app) {

    });
});