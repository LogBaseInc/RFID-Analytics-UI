define(['angular',
  'angularAMD'],
  function (angular, angularAMD) {
      (function () {
          'use strict';

          var app = angular.module('rfidanalyticsApp', [
              // Angular modules 
             'ngRoute',         
             'ngMessages',

             // 3rd Party Modules
             //'ui.bootstrap',
             'toaster',
          ]);

          app.run(['$route', function ($route) {
              
          }]);

          window.scriptLoaded = function() {

          };

          require([
              'config',
              'config.route',
              'views/layout/shell',
              'views/component/spinner/spinner',
              'views/component/notify/notify',
              'views/component/sessionservice',
              'views/directives/startupdirectives'
          ], function () {
              angular.element(document).ready(function () {
                  return angularAMD.bootstrap(app);
              });
          });

    })();
});
