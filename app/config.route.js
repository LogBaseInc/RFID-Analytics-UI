define(['angular',
    'angularAMD'], function (
        angular,
        angularAMD) {

        var app = angular.module('rfidanalyticsApp');

        // Collect the routes
        app.constant('routes', getRoutes());

        app.run(['$templateCache', function ($templateCache) {
            app.$templateCache = $templateCache;
        }]);

        // Configure the routes and route resolvers
        app.config(['$routeProvider', 'routes', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$httpProvider', routeConfigurator]);

        function routeConfigurator($routeProvider, routes, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider) {
            $httpProvider.defaults.cache = false;
            app.register =
            {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };

            routes.forEach(function (r) {
                var definition = r.config;
                $routeProvider.when(r.url, angularAMD.route(r.config));
                definition.resolve = angular.extend(definition.resolve || {}, {});
                $routeProvider.when(r.url, definition);
                return $routeProvider;
            });
            $routeProvider.otherwise({ redirectTo: '/login' });
        }

        // Define the routes 
        function getRoutes() {
            var routs = [
                 {
                     url: '/login',
                     config: {
                        templateUrl: 'views/login/login.html',
                        title: 'login',
                        controllerUrl: 'views/login/login',
                        allowAnonymous: true
                     }
                 },
                 {
                     url: '/upload',
                     config: {
                        templateUrl: 'views/upload/upload.html',
                        title: 'upload',
                        controllerUrl: 'views/upload/upload',
                        allowAnonymous: false
                     }
                 },
                 {
                     url: '/dashboard',
                     config: {
                        templateUrl: 'views/dashboard/dashboard.html',
                        title: 'dashboard',
                        controllerUrl: 'views/dashboard/dashboard',
                        allowAnonymous: false
                     }
                 },
                 {
                     url: '/changepassword',
                     config: {
                        templateUrl: 'views/change_password/changepassword.html',
                        title: 'changepassword',
                        controllerUrl: 'views/change_password/changepassword',
                        allowAnonymous: false
                     }
                 }
            ];

            return routs;
        }
        return app;
    });

