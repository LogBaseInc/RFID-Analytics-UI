define(['angular'], function () {
    (function () {
        'use strict';

        var controllerId = 'shell';
        angular.module('rfidanalyticsApp').controller(controllerId, ['$rootScope', '$scope', '$location', 'config', 'notify', 'sessionservice', shell]);

        function shell($rootScope, $scope, $location, config, notify, sessionservice) {
            var vm = this;
            vm.loadSpinner = false;
            vm.isloggedIn = sessionservice.isLoggedIn();
            vm.logout = logout;

            activate();

            function activate() { 
                checkIfLoggedIn();
            }

            $rootScope.$on('logout', function() {
                logout();
            });

            function logout(){
                sessionservice.clear();
                vm.isloggedIn = false;
                vm.loadSpinner = false;
                var ref = new Firebase(config.firebaseUrl);
                ref.unauth();
                ref.off();
                $location.path('/login');
            }

            $rootScope.$on('spinner:toggle', function (event, data) {
                vm.loadSpinner = data.isShow;
            });

            $rootScope.$on('login:status', function (event, data) {
                vm.isloggedIn = data.isloggedIn;
            });

            $(document).on('click','.navbar-collapse.in',function(e) {
                if( $(e.target).is('a') ) {
                    $(this).collapse('hide');
                }
            });

            $rootScope.$on('$routeChangeStart', function (event, next, current) {
                vm.isloggedIn = sessionservice.isLoggedIn();
                var isAnonymous = false;
                if (next.$$route && next.$$route.allowAnonymous)
                    isAnonymous = next.$$route.allowAnonymous;
                if (!isAnonymous && vm.isloggedIn == 'false') {
                    event.preventDefault();
                    $rootScope.$evalAsync(function () {
                        $location.path('/login');
                    });
                 }
            });

            $rootScope.$on('$routeChangeSuccess', function (event, next, current) {
                analytics.page($location.$$path);
            });

            function checkIfLoggedIn() {
                var islogin = $location.$$path.indexOf('login') >=0 ;
                if(vm.isloggedIn == 'false' && !islogin) {
                    $location.path('/login');
                }
                else if(vm.isloggedIn == 'true' && islogin) {
                    $location.path('/upload');
                }
            }
        }
    })();
});