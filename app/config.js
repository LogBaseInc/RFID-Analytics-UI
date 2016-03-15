define(['angular'], function (angular) {

    (function () {
        'use strict';

        var app = angular.module('rfidanalyticsApp');

        var config = {
        	firebaseUrl: 'https://rfid-analytics.firebaseio.com/',
        	uploadUrl : 'http://0.0.0.0:3000/',
        	uploadToken : '060cf688-e0bb-4fbe-86cd-482a52772940'
        };

        app.value('config', config);
    })();
});
