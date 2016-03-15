define(['angular',
    'config.route', 
    'lib'], function (angular, configroute) {
        (function () {
            configroute.register.controller('dashboard', ['$rootScope', '$scope', 'config', 'spinner', 'notify', 'sessionservice', 'utility', dashboard]);
            function dashboard($rootScope, $scope, config, spinner, notify, sessionservice, utility) {
                var vm = this;
                activate();
                function activate(){
                   $rootScope.routeSelection = "dashboard";
                }
            }
    })();
});