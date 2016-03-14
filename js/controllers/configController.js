define(['controllers/controllerModule', 'jquery'], function(controllerModule, $) {
    controllerModule.controller('configController', ['$scope', '$http', '$filter', 'modalService', 'appUrlService', function($scope, $http, $filter, modalService, appUrlService) {
        var errorModal, arr = [];
        $scope.serviceConfigurationAttrs = {};
        $scope.importAttrs={};
        $scope.selectedItem = {};
        $scope.MAX_RECORDS = [100, 200, 300, 400, 500];
        $scope.RETRY_LIMIT = [3, 4, 5, 6, 7, 8, 9, 10];
        $scope.onlyNumbers = /^\d+$/;
        $scope.selectItems = ["All", "Manufacturers", "Categories", "Software Products", "Software Product Versions", "Hardware Products", "Hardware Product Models"];
        $scope.proxyServerPattern = "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})$|^((([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9]))$";
        $scope.loadConfigError = "The Service Configuration Data could not be fetched.Try again Later!";
        $scope.updateConfigError = "The Service Configurations could not be updated for now.Try again later";
        $scope.formSubmit = "Could not submit the form.Try again later";
        $scope.fetchDataMsg = "Could not Fetch the Data.Try again later";
        $scope.runProcess = "Could not run the process.Try again later";
        $scope.status = {
            isFirstOpen: false,
            isSecondOpen: true,
            isThirdOpen: false,
            isFourthOpen: false,
            calenderOne: false,
            calenderTwo: false
        };
        $scope.configs = {
            minDate: "",
            maxDate: "",
            minimumDate: new Date("12/31/1901"),
            maximumDate: new Date("1/1/2900")
        };
        $scope.format = "yyyy-MM-dd";
        $scope.ConfigurationStatus = {};
        var assets = ["All", "Manufacturer", "Category", "SoftwareProduct", "SoftwareProductVersion", "HardwareProduct", "HardwareProductModel"];
        var configColumnsDefs = [{
            field: 'sno',
            title: 'Row',
            align: 'Left',
            valign: 'middle'
        }, {
            field: 'action',
            title: 'Data',
            align: 'Left',
            valign: 'middle'
        }, {
            field: 'status',
            title: 'Status',
            align: 'Left',
            valign: 'middle'
        }, {
            field: 'createdDate',
            title: 'Created',
            align: 'Left',
            valign: 'middle'
        }, {
            field: 'modifiedDate',
            title: 'Modified',
            align: 'Left',
            valign: 'middle'
        }, {
            field: 'type',
            title: 'Type',
            align: 'Left',
            valign: 'middle'
        }, {
            field: 'errorMsg',
            title: 'Comments',
            align: 'Left',
            valign: 'middle'
        }];

        $scope.ConfigurationStatus = {
            options: {
                columns: configColumnsDefs,
                pagination: true,
                sidePagination: 'client',
                search: false,
                data: [],
                pageNumber: 1,
                pageSize: 10,
                height: 400,
                customClass: 'configurationList'
            }
        };

        $scope.$watch("status.isFirstOpen", function(isOpen) {
            if (isOpen) {
                $scope.fetchData();
            }
        });
        $scope.fetchData = function() {
            var isAllCompleted = true;
            $("#ConfigurationStatus").bootstrapTable('showLoading');
            $http({
                method: 'GET',
                url: '/bdnaint/services/extraction/viewhistory'
            }).success(function(resp) {
                for (i = 0; i < resp.extractionList.length; i++) {
                    resp.extractionList[i].sno = i + 1;
                    if (resp.extractionList[i].status == "InProgress") {
                        isAllCompleted = false;
                    }
                }
                if (isAllCompleted) {
                    $(".errorMsg").html("");
                }
                $scope.ConfigurationStatus.options.data = resp.extractionList;
                $("#ConfigurationStatus").bootstrapTable('hideLoading');
            }).error(function() {
                errorModal = modalService.init("commonModalTemplate.html", "modalController", $scope.fetchDataMsg, {
                    class: "configUpdate-overlay"
                })();
            });
        }
        this.fetchSelectedData = function() {
            var asset = "";
            var selectedItemIndex;
            for (i = 1; i < $(".selectProcess").children().length; i++) {
                if ($($(".selectProcess").children()[i]).val() === $(".selectProcess").val()) {
                    selectedItemIndex = i;
                }
            }
            if (selectedItemIndex) {
                asset = assets[selectedItemIndex - 1];
            }
            var url = "/bdnaint/services/extraction?asset=" + asset + "&type=Manual";
            if (asset) {
                $http({
                    method: 'GET',
                    url: url,
                }).success(function(resp) {
                    $(".errorMsg").html(resp.errorMsg);
                    $scope.fetchData();
                }).error(function() {
                    errorModal = modalService.init("commonModalTemplate.html", "modalController", $scope.runProcess, {
                        class: "configUpdate-overlay"
                    })();
                });
            }
        }

        this.saveServiceConfig = function() {
            $("#loaderContainer").show();
			proxyPattern = true;
            portPattern = true;
            if ($scope.serviceConfigurationAttrs.PROXY_PORT !== '') {
                portRegex = new RegExp($scope.onlyNumbers);
                portPattern = portRegex.test($scope.serviceConfigurationAttrs.PROXY_PORT);
                if (!portPattern) {
                    $("#portPattrn").removeClass('ng-hide');
                    $("#portMinlength").addClass('ng-hide');
                    $("#portMaxlength").addClass('ng-hide');
                }
                if ($scope.serviceConfigurationAttrs.PROXY_PORT.length < 2) {
                    $scope.portMinlength = true;
                    $("#portMinlength").removeClass('ng-hide');
                    if (!portPattern) {
                        $("#portPattrn").removeClass('ng-hide');
                    } else {
                        $("#portPattrn").addClass('ng-hide');
                    }

                    $("#portMaxlength").addClass('ng-hide');
                    portPattern = false
                }
                if ($scope.serviceConfigurationAttrs.PROXY_PORT.length > 4) {
                    $scope.portMaxlength = true;
                    $("#portMaxlength").removeClass('ng-hide');
                    if (!portPattern) {
                        $("#portPattrn").removeClass('ng-hide');
                    } else {
                        $("#portPattrn").addClass('ng-hide');
                    }

                    $("#portMinlength").addClass('ng-hide');
                    portPattern = false;
                }
            }
            if ($scope.serviceConfigurationAttrs.PROXY_SERVER !== '') {
                proxyRegex = new RegExp($scope.proxyServerPattern);
                proxyPattern = proxyRegex.test($scope.serviceConfigurationAttrs.PROXY_SERVER);
                if (!proxyPattern) {
                    $("#proxyPattern").removeClass('ng-hide');
                    $("#proxyMaxlength").addClass('ng-hide');
                   
                }
                if ($scope.serviceConfigurationAttrs.PROXY_SERVER.length > 100) {
                    $scope.proxyMaxlength = true;
                    $("#proxyMaxlength").removeClass('ng-hide');
                    if (!proxyPattern) {
                        $("#proxyMaxlength").removeClass('ng-hide');
                    } else {
                        $("#proxyPattern").addClass('ng-hide');
                    }

                    proxyPattern = false;
                }

            }
            if (portPattern && proxyPattern) {
                $scope.serviceConfigurationAttrs.API_KEY = "apiKey" + " " + $scope.serviceConfigurationAttrs.API_KEY;
                modifiedConfiguration = $scope.serviceConfigurationAttrs;
                $http({
                    method: "PUT",
                    url: appUrlService.updateConfigurationsUrl,
                    data: modifiedConfiguration
                }).success(function(resp) {
                    arr = resp.API_KEY.split(' ');
                    resp.API_KEY = arr[1];
                    $scope.serviceConfigurationAttrs = resp;
                    $("#portPattrn").addClass('ng-hide');
                    $("#portMinlength").addClass('ng-hide');
                   $("#portMaxlength").addClass('ng-hide');
                   $("#proxyMaxlength").addClass('ng-hide');
                   $("#proxyPattern").addClass('ng-hide');
                   $("#loaderContainer").hide();
                }).error(function() {
                    $("#loaderContainer").hide();
                    errorModal = modalService.init("commonModalTemplate.html", "modalController", $scope.updateConfigError, {
                        class: "configUpdate-overlay"
                    })();
                });
            } else {
                $("#loaderContainer").hide();
            }
        }

        $scope.$watch('status.isSecondOpen', function(isOpen) {
            if (isOpen) {

                $("#loaderContainer").show();
                $http.get(appUrlService.getConfigurationsUrl)
                    .success(function(data) {
                        arr = data.API_KEY.split(' ');
                        data.API_KEY = arr[1];
                        $scope.serviceConfigurationAttrs = data;

                        $("#loaderContainer").hide();
                    }).error(function(data) {

                        $("#loaderContainer").hide();
                        errorModal = modalService.init("commonModalTemplate.html", "modalController", $scope.loadConfigError, {
                            class: "configLoad-overlay"
                        })();

                    });
            }
        });
        $scope.$watch('status.isThirdOpen', function(isOpen) {
            if (isOpen) {
                $("#loaderContainer").show();
                $http.get(appUrlService.getBadDatesUrl)
                    .success(function(data) {
                        $("#loaderContainer").hide();
                        $scope.configs.minDate = data.MIN_DATE;
                        $scope.configs.maxDate = data.MAX_DATE;
                    }).error(function(data) {
                        $("#loaderContainer").hide();
                        errorModal = modalService.init("commonModalTemplate.html", "modalController", $scope.fetchData, {
                            class: "configUpdate-overlay"
                        })();
                    });
            }
        });
        this.submitBaddates = function() {
            var minDate = $filter('date')($scope.configs.minDate, 'yyyy-MM-dd');
            var maxDate = $filter('date')($scope.configs.maxDate, 'yyyy-MM-dd');
            $("#loaderContainer").show();
            if(!($scope.configs.minDate<$scope.configs.minimumDate)&&!($scope.configs.maxDate>$scope.configs.maximumDate)){
                $http({
                    method: "PUT",
                    url: appUrlService.getBadDatesUrl,
                    data: {
                        MAX_DATE: maxDate,
                        MIN_DATE: minDate
                    }
                }).success(function(resp) {
                    $("#loaderContainer").hide();
                }).error(function() {
                    $("#loaderContainer").hide();
                    errorModal = modalService.init("commonModalTemplate.html", "modalController", $scope.formSubmit, {
                        class: "configUpdate-overlay"
                    })();
                });
            }
            else{
                $("#loaderContainer").hide();
            }
        }
        $scope.$watch('configs.minDate', function() {
            if ($scope.configs.minDate === undefined ||($scope.configs.minDate<$scope.configs.minimumDate)){
                $(".minDtErr").css("display", "block");
            } else {
                $(".minDtErr").css("display", "none");
            }
        })

        $scope.$watch('configs.maxDate', function() {
            if ($scope.configs.maxDate === undefined ||($scope.configs.maxDate>$scope.configs.maximumDate)) {
                $(".maxDtErr").css("display", "block");
            } else {
                $(".maxDtErr").css("display", "none");
            }
        })

        // $scope.$watch('status.isFourthOpen', function(isOpen) {
        //     if (isOpen) {
        //         $http.get(appUrlService.getEmailUrl)
        //             .success(function(data) {
        //                 $scope.configs.email = data.EMAIL;
        //             }).error(function(data) {
        //                 errorModal = modalService.init("commonModalTemplate.html", "modalController", $scope.fetchData, {
        //                     class: "configUpdate-overlay"
        //                 })();
        //             });
        //     }
        // });
        // this.submitEmail = function() {
        //     email = $scope.configs.email;
        //     if (email) {
        //         $http({
        //             method: "PUT",
        //             url: appUrlService.getEmailUrl,
        //             data: {
        //                 EMAIL: email
        //             }
        //         }).success(function(resp) {
        //             console.log(resp);
        //         }).error(function() {
        //             errorModal = modalService.init("commonModalTemplate.html", "modalController", $scope.formSubmit, {
        //                 class: "configUpdate-overlay"
        //             })();
        //         });
        //     }

        // }
		
		 $scope.$watch('status.isFourthOpen',function(isOpen){
              if (isOpen) {
                $("#loaderContainer").show();
                $http.get(appUrlService.getImportOptionsUrl)
                    .success(function(data) {                      
                        data.PUSH_CAT_INFO_TO_TROUX = data.PUSH_CAT_INFO_TO_TROUX === "true" ? true : false;
                        data.PUSH_MNF_INFO_TO_TROUX = data.PUSH_MNF_INFO_TO_TROUX === "true" ? true : false;
                        data.PUSH_PRODUCTS_TO_TROUX = data.PUSH_PRODUCTS_TO_TROUX === "true" ? true : false;
                        $scope.importAttrs = data;
                        $("#loaderContainer").hide();
                    }).error(function(data) {
                        $("#loaderContainer").hide();
                        errorModal = modalService.init("commonModalTemplate.html", "modalController", $scope.loadConfigError, {
                            class: "configLoad-overlay"
                        })();

                    });
            }
        });

this.saveImportOptions=function(){

          $("#loaderContainer").show();         
            modifiedConfiguration = $scope.importAttrs;
            $http({
                method: "PUT",
                url: appUrlService.getImportOptionsUrl,
                data: modifiedConfiguration
            }).success(function(resp) {
              
                resp.PUSH_CAT_INFO_TO_TROUX = resp.PUSH_CAT_INFO_TO_TROUX === "true" ? true : false;
                resp.PUSH_MNF_INFO_TO_TROUX = resp.PUSH_MNF_INFO_TO_TROUX === "true" ? true : false;
                resp.PUSH_PRODUCTS_TO_TROUX = resp.PUSH_PRODUCTS_TO_TROUX === "true" ? true : false;
                $scope.importAttrs = resp;
                $("#loaderContainer").hide();
            }).error(function() {
                $("#loaderContainer").hide();
                errorModal = modalService.init("commonModalTemplate.html", "modalController", $scope.updateConfigError, {
                    class: "configUpdate-overlay"
                })();
            });

}
        $scope.openCalenderOne = function($event) {
            $scope.status.calenderOne = true;
        };
        $scope.openCalenderTwo = function($event) {
            $scope.status.calenderTwo = true;
        };
    }])
});
