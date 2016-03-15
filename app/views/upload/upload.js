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
                            var r = new FileReader();
                            r.onload = function(e) {
                               var contents = e.target.result;
                               var rows = contents.split("\r");
                               var hhvalues = [];
                               
                               var storeidpresent = false;
                               var headers = rows[0].split(",");
                               var auditIdIndex = 0;
                               if(headers[0].toLowerCase().indexOf("store") >=0 ) {
                                    storeidpresent = true;
                                    auditIdIndex = 1;
                                }

                               for(var i=1 ; i<rows.length; i++) {
                                    if(rows[i].lastIndexOf(",") != (rows[i].length-1)) {
                                        var rowvalue = (rows[i].replace("\n","")).split(",");
                                        if(rowvalue.length >= 11) {
                                            hhvalues.push({
                                                storeId : storeidpresent ? rowvalue[0].toString() : "373",
                                                auditId : rowvalue[auditIdIndex].toString(),
                                                source : rowvalue[auditIdIndex+1].toString(),
                                                epc : rowvalue[auditIdIndex+2].toString(),
                                                ts : rowvalue[auditIdIndex+3].toString(),
                                                location : rowvalue[auditIdIndex+4].toString(),
                                                gtin : rowvalue[auditIdIndex+5].toString(),
                                                group : rowvalue[auditIdIndex+6].toString(),
                                                x : rowvalue[auditIdIndex+7].toString(),
                                                y : rowvalue[auditIdIndex+8].toString(),
                                                z : rowvalue[auditIdIndex+9].toString(),
                                                region : rowvalue[auditIdIndex+10].toString(),
                                            });
                                        }
                                    }
                               }

                              if(hhvalues.length > 0) {
                                    return uploadservice.uploadhh(hhvalues).
                                    then(
                                    function (data) {
                                        notify.success("Handheld file uploaded");
                                        clearUpload("HH");
                                    }, 
                                    function (error) {
                                        notify.error("Something went worng, please try after sometime");
                                        clearUpload("HH");
                                    });
                               }
                               else {
                                    spinner.hide();
                                    notify.warning("No data found to upload");
                                    clearUpload("HH");
                               }
                           };
                           r.readAsText(vm.selectedhhfile);
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
                            var r = new FileReader();
                            r.onload = function(e) {
                               var contents = e.target.result;
                               var rows = contents.split("\r");
                               var prenotevalues = [];
                               for(var i=0 ; i<rows.length; i++) {
                                    var rowvalue = (rows[i].replace("\n","")).split(",");
                                    if(rowvalue.length == 10) {
                                        prenotevalues.push({
                                            storeId : rowvalue[0].toString(),
                                            upc : rowvalue[1].toString(),
                                            itemNumber : rowvalue[2].toString(),
                                            dept : rowvalue[3].toString(),
                                            quantity : rowvalue[4].toString(),
                                            loadId : rowvalue[5].toString(),
                                            trailerId : rowvalue[6].toString(),
                                            tripId : rowvalue[7].toString(),
                                            shipmentId : rowvalue[8].toString(),
                                            ts : rowvalue[9].toString(),
                                        });
                                    }
                               }
                               if(prenotevalues.length > 0) {
                                    return uploadservice.uploadprenote(prenotevalues).
                                    then(
                                    function (data) {
                                        notify.success("Pre note file uploaded");
                                        clearUpload("PN");
                                    }, 
                                    function (error) {
                                        notify.error("Something went worng, please try after sometime");
                                        clearUpload("PN");
                                    });
                               }
                               else {
                                    spinner.hide();
                                    notify.warning("No data found to upload");
                                    clearUpload("PN");
                               }
                           };
                           r.readAsText(vm.selectedpnfile);
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