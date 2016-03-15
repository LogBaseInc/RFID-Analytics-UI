define(['angular'], function (angular) {
    (function () {
        var module = angular.module('rfidanalyticsApp');
        module.factory('utility', ['$rootScope', 'config', utility]);

        function utility($rootScope, $log, config) {

            return {
                applyscope : applyscope,
                generateUUID : generateUUID,
                closekeyboard : closekeyboard,
            };
            
            function applyscope($scope) {
                if ($scope.$root && $scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') 
                    $scope.$apply();
            }

            function generateUUID() {
                // http://www.ietf.org/rfc/rfc4122.txt
                var s = [];
                var hexDigits = "0123456789abcdef";
                for (var i = 0; i < 36; i++) {
                    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
                }
                s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
                s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
                s[8] = s[13] = s[18] = s[23] = "-";

                var uuid = s.join("");
                return uuid;
             }

            function closekeyboard(element) {
                element.attr('readonly', 'readonly');
                element.attr('disabled', 'true');
                setTimeout(function() {
                    element.blur(); 
                    element.removeAttr('readonly');
                    element.removeAttr('disabled');
                }, 100);
            }
       }
    })();
});