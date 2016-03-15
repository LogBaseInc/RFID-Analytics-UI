define(['angular', 'config.route'], function (angular, configroute) {
    (function () {
        'use strict';
        var serviceId = 'uploadservice';
        configroute.register.factory(serviceId, ['$http', '$q', '$log', 'config', uploadservice]);

        function uploadservice($http, $q, $log, config) {
            var url = config.uploadUrl;
            var token = config.uploadToken;
            var service = {
                uploadhh: uploadhh,
                uploadss : uploadss,
                uploadprenote : uploadprenote,
            };
            return service;

            function uploadhh(data) {
                var urlstr =  url + 'zebra/hh/'+token;
                return $http({
                    url: urlstr,
                    method: "POST",
                    data: data
                })
                .then(function(response) {
                    return response.data;
                }, function(error, code) {
                    $log.error(urlstr +" Error :" + error);
                    return $q.reject(error);
                });
            }

            function uploadss(data) {
                var urlstr =  url + 'zebra/ss/'+token;
                return $http({
                    url: urlstr,
                    method: "POST",
                    data: data
                })
                .then(function(response) {
                    return response.data;
                }, function(error, code) {
                    $log.error(urlstr +" Error :" + error);
                    return $q.reject(error);
                });
            }

            function uploadprenote(data) {
                var urlstr =  url + 'prenote/'+token;
                return $http({
                    url: urlstr,
                    method: "POST",
                    data: data
                })
                .then(function(response) {
                    return response.data;
                }, function(error, code) {
                    $log.error(urlstr +" Error :" + error);
                    return $q.reject(error);
                });
            }
        }
    })();
});