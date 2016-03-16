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

            function uploadhh(formdata) {
                var urlstr =  url + 'zebra/hh/'+token;
                return $http({
                    url: urlstr,
                    method: "POST",
                    headers : {
                      'Content-Type': undefined
                    },
                    data: formdata
                })
                .then(function(response) {
                    return response.data;
                }, function(error, code) {
                    $log.error(urlstr +" Error :" + error);
                    return $q.reject(error);
                });
            }

            function uploadss(formdata) {
                var urlstr =  url + 'zebra/ss/'+token;
                return $http({
                    url: urlstr,
                    method: "POST",
                    headers : {
                      'Content-Type': undefined
                    },
                    data: formdata
                })
                .then(function(response) {
                    return response.data;
                }, function(error, code) {
                    $log.error(urlstr +" Error :" + error);
                    return $q.reject(error);
                });
            }

            function uploadprenote(formdata) {
                var urlstr =  url + 'prenote/'+token;
                return $http({
                    url: urlstr,
                    method: "POST",
                    headers : {
                      'Content-Type': undefined
                    },
                    data: formdata
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