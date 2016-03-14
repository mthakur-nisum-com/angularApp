define(['controllers/controllerModule', 'jquery'], function(controllerModule, $) {
    controllerModule.controller('manufacturesController', ["$rootScope", '$state', '$http', '$scope', '$location', "sharedService", "modalService", "errorMessagesService", "appUrlService",
        function($rootScope, $state, $http, $scope, $location, sharedService, modalService, errorMessagesService, appUrlService) {
            var errorModal;
            console.log("dsd");
            var radioBtn = sessionStorage.radioBtnSelected;
            if (radioBtn === "Softwares") {
                $scope.VersionsOrModels = "Versions";
            } else if (radioBtn === "Hardwares") {
                $scope.VersionsOrModels = "Models";
            } else if (radioBtn === undefined) {
                $scope.VersionsOrModels = "Versions";
            }
            $scope.availableManufacturers = [];
            $scope.selectedManufacturers = [];
            $scope.availableManufacturersLength = 0;
            $scope.selectedManufacturersLength = 0;
            $scope.requestId = '';
            var reqMethod = "POST";
            var savingManufacturersUrl = appUrlService.postManufacturersUrl;
            var updatingManufacturersUrl;
            //$scope.viewLoading = true;
            $("#loaderContainer").show();
            $scope.requestId = sessionStorage.requestId;
            if ($scope.requestId) {
                var traversebackurl = appUrlService.getSelectedManufacturersUrl + $scope.requestId;
                $http.get(traversebackurl)
                    .success(function(selectedData) {
                        if(selectedData.manufacturers){
                            $scope.availableManufacturers = selectedData.manufacturers;
                            $scope.availableManufacturersLength = selectedData.manufacturers.length;
                            $scope.selectedManufacturers = selectedData.selectedManufacturers;
                            $scope.selectedManufacturersLength = selectedData.selectedManufacturers.length;
                        }
                       
                        //$scope.viewLoading = false;
                          $("#loaderContainer").hide();
                    }).
                error(function() {
                   // $scope.viewLoading = false;
                     $("#loaderContainer").hide();
                    errorModal = modalService.init("commonModalTemplate.html", "modalController", $scope.manufacturersRetrivalErrormsg, {
                        class: "retrival-overlay"
                    })();

                });
            } else {
                $http.get(appUrlService.getManufacturersUrl)
                    .success(function(data) {
                        console.log("test123");
                        if (data.manufacturers) {
                            $scope.availableManufacturers = data.manufacturers;
                            $scope.availableManufacturersLength = data.manufacturers.length;
                        }

                        //$scope.viewLoading = false;
                          $("#loaderContainer").hide();

                    }).error(function(data) {
                       // $scope.viewLoading = false;
                         $("#loaderContainer").hide();
                        errorModal = modalService.init("commonModalTemplate.html", "modalController", errorMessagesService.manufacturersRetrivalErrormsg, {
                            class: "retrival-overlay"
                        })();
                    });

            }
            this.save = function() {
                var selectedmanufacturersArrayLength;
                var selectedmanufacturersArray = [];
                if ($scope.requestId) {
                    reqMethod = "PUT";
                    updatingManufacturersUrl = appUrlService.postManufacturersUrl + $scope.requestId;
                    savingManufacturersUrl = updatingManufacturersUrl;
                }
                selectedmanufacturersArray = (sharedService.getSelectedManufacturers());
                selectedmanufacturersArrayLength = selectedmanufacturersArray.length;
                if (selectedmanufacturersArrayLength > 100) {
                    errorModal = modalService.init("limitManufaturersModalTemplate.html", "modalController", errorMessagesService.manufacturersLimitExceedmsg, {
                        class: "limitExceed-overlay"
                    })();

                } else {
                    $http({
                        method: reqMethod,
                        url: savingManufacturersUrl,
                        data: selectedmanufacturersArray
                    }).success(function(resp) {
                        console.log(resp.primaryId, "abc");
                        if (resp.primaryId) {
                            $scope.requestId = resp.primaryId;
                            sessionStorage.setItem('requestId', resp.primaryId);
                            $state.go('root.categories');
                        } else {
                            $state.go('root.categories');
                        }

                    }).error(function() {
                        errorModal = modalService.init("commonModalTemplate.html", "modalController", errorMessagesService.manufacturersUpdateErrormsg, {
                            class: "update-overlay"
                        })();
                    });
                }


            }
        }


    ]);

});
