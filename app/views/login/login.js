define(['angular',
    'config.route', 
    'lib',
    'views/services/loginservice'], function (angular, configroute) {
        (function () {
            configroute.register.controller('login', ['$rootScope', '$scope', '$location', 'config', 'spinner', 'notify', 'sessionservice', 'loginservice', 'utility', login]);
            function login($rootScope, $scope, $location, config, spinner, notify, sessionservice, loginservice, utility) {
                var vm = this, submitted = false;
                vm.logindiv = true;
                vm.forgotdiv = false;
                vm.success = true;
                var uuid = null;
                vm.backtologinclicked = backtologinclicked;

                Object.defineProperty(vm, 'canLogin', {
                    get: canLogin
                });

                Object.defineProperty(vm, 'canResetPassword', {
                    get: canResetPassword
                });

                vm.interacted = function (field) {
                    return submitted || field.$dirty;
                };

                activate();
                function activate(){
                    spinner.hide();
                    if(sessionservice.isLoggedIn() == 'true') {
                        $location.path('/upload');
                    }
                    else {
                        sessionservice.clear();
                    }
                }

                vm.login = function () {
                    if(vm.canLogin) { 
                        document.activeElement.blur();  
                         Array.prototype.forEach.call(document.querySelectorAll('input, textarea'), function(it) { 
                            it.blur(); 
                        });
     
                        utility.closekeyboard($('#txtPassword'));    
                        spinner.show();
                        submitted= true;
                        return loginservice.login(vm.userName, vm.password).then(loginCompleted, loginfailed);
                    }
                };

                function loginCompleted(data) {
                    spinner.hide();
                    submitted = false;
                    vm.success = true;
                    sessionservice.setSession(data);
                    $location.path('/detail');    
                    utility.applyscope($scope);     
                }

                function loginfailed(error) { 
                    spinner.hide();
                    submitted = false;
                    if(error.message.indexOf("The specified user does not exist") >= 0 || error.message.indexOf("The specified password is incorrect") >= 0) {
                        vm.success = false;
                        vm.password = null;
                        resetform($scope.loginform);
                    }
                    else {
                        notify.error('Something went wrong, please try again later');
                        vm.password = null;
                        resetform($scope.loginform);
                    }
                }

                vm.forgotpassword = function() {
                    spinner.show();
                    submitted= true;
                    loginservice.resetpasswordlink(vm.useremail).then(forgotpasswordcompleted, forgotpasswordfailed)
                }

                function forgotpasswordcompleted() {
                    spinner.hide();
                    submitted = false;
                    notify.success('Password reset sent to '+vm.useremail);
                    vm.useremail = null;
                    resetform($scope.forgotpassform);
                    vm.backtologinclicked();
                }

                function forgotpasswordfailed(error) {
                    spinner.hide();
                    submitted = false;
                    notify.error(error.message)
                    vm.useremail = null;
                    resetform($scope.forgotpassform);
                }
              
                vm.forgotpasswordlinkclicked = function() {
                    linkclicked();
                    vm.forgotdiv = true;
                }

                function backtologinclicked() {
                    linkclicked();
                    vm.logindiv = true;
                }

                vm.hide = function () {
                    vm.success = true;
                }

                function canLogin() {
                    return $scope.loginform. $valid && !submitted;
                }

                function canResetPassword() {
                    return $scope.forgotpassform.$valid && !submitted;
                }

                              
                function resetform(form) {
                    form.$setPristine();
                    form.$setUntouched();
                }

                function linkclicked() {
                    vm.logindiv = false;
                    vm.forgotdiv = false;
                    vm.password = null;
                    vm.userName =null;
                    resetform($scope.forgotpassform);
                    resetform($scope.loginform);
                }
            }
    })();
});