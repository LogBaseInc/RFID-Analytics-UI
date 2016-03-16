define(['angular',
    'config.route', 
    'lib',
    'views/services/uploadservice'], function (angular, configroute) {
        (function () {
            configroute.register.controller('upload', ['$rootScope', '$scope', 'config', 'spinner', 'notify', 'sessionservice', 'uploadservice', 'utility', upload]);
            function upload($rootScope, $scope, config, spinner, notify, sessionservice, uploadservice, utility) {
                var vm = this;
                activate();
                function activate() {
                   $rootScope.routeSelection = "upload";
                }

                vm.uploadhh = function() {
                    if(vm.selectedhhfile != null && vm.selectedhhfile != undefined) {
                        if(vm.selectedhhfile.name.indexOf(".csv") > 0) {
                            spinner.show();

                            var formData = new FormData();
                            formData.append('file', vm.selectedhhfile);

                            return uploadservice.uploadhh(formData).
                            then(function (data) {
                                spinner.hide();
                                notify.success("Handheld file uploaded");
                                clearUpload("HH");
                            }, 
                            function (error) {
                                spinner.hide();
                                notify.error("Something went worng, please try after sometime");
                                clearUpload("HH");
                            });
                        }
                        else {
                            spinner.hide();
                            notify.error("Upload only .csv file.")
                        }
                    }
                    else {
                        spinner.hide();
                        notify.error("No file chosen.")
                    }
                }

                vm.uploadprenote = function() {
                    if(vm.selectedpnfile != null && vm.selectedpnfile != undefined) {
                        if(vm.selectedpnfile.name.indexOf(".csv") > 0) {
                            spinner.show();

                            var formData = new FormData();
                            formData.append('file', vm.selectedpnfile);

                            return uploadservice.uploadprenote(formData).
                            then(function (data) {
                                spinner.hide();
                                notify.success("Prenote file uploaded");
                                clearUpload("PN");
                            }, 
                            function (error) {
                                spinner.hide();
                                notify.error("Something went worng, please try after sometime");
                                clearUpload("PN");
                            });
                        }
                        else {
                            spinner.hide();
                            notify.error("Upload only .csv file.");
                            clearUpload("PN");
                        }
                    }
                    else {
                        spinner.hide();
                        notify.error("No file chosen.");
                    }
                }

                vm.uploadhss = function() {
                    if(vm.selectedssfile != null && vm.selectedssfile != undefined) {
                        if(vm.selectedssfile.name.indexOf(".csv") > 0) {
                            spinner.show();

                            var formData = new FormData();
                            formData.append('file', vm.selectedssfile);

                            return uploadservice.uploadss(formData).
                            then(function (data) {
                                spinner.hide();
                                notify.success("Smart sense file uploaded");
                                clearUpload("SS");
                            }, 
                            function (error) {
                                spinner.hide();
                                notify.error("Something went worng, please try after sometime");
                                clearUpload("SS");
                            });
                        }
                        else {
                            spinner.hide();
                            notify.error("Upload only .csv file.");
                            clearUpload("SS");
                        }
                    }
                    else {
                        spinner.hide();
                        notify.error("No file chosen.");
                    }
                }

                function clearUpload (type) {
                    spinner.hide();
                    if(type == "HH") {
                        vm.selectedhhfile= null;
                    }
                    else if(type == "SS") {
                        vm.selectedssfile= null;
                    }
                    else if(type == "PN") {
                        vm.selectedpnfile= null;
                    }
                    else if(type == "IF") {
                        vm.selectediffile = null
                    }
                    utility.applyscope($scope);
                }

                
            }
    })();
});