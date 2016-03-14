define(['controllers/controllerModule', 'jquery', 'bootstrapTable'], function(controllerModule, $, bootstrapTable) {

    controllerModule.controller('selectAllRecordsOverlayController', ["$rootScope", "$scope", "$http", "$state", "$modalInstance", "callerScope", "appUrlService", "modalService", "errorMessagesService",
        function($rootScope, $scope, $http, $state, $modalInstance, callerScope, appUrlService, modalService, errorMessagesService) {

            $scope.additionalMsg = callerScope;
            var selectAllUrl, productType,searchTxt,radioBtn;
            $scope.cancel = function() {
                $modalInstance.dismiss("cancel");
            };

            $scope.SubmitAllProducts = function() {
                $modalInstance.close();
                 $("#loaderContainer").show();
                searchTxt = $("#avaliableProductsGrid").bootstrapTable('getSrchTxt');
                $scope.requestId = sessionStorage.requestId;
                 radioBtn = sessionStorage.radioBtnSelected;
                if (radioBtn === "Softwares") {
                    productType = "softwareproducts";
                } else if (radioBtn === "Hardwares") {
                    productType = "hardwareproducts"
                }
                if (typeof searchTxt === "string") {
                    if ($scope.requestId !== undefined) {
                        selectAllUrl = appUrlService.selectAllUrl + '/' + $scope.requestId + "/addinfo?type=" + productType + "&searchtext=" + searchTxt;

                    } else {
                        selectAllUrl = appUrlService.selectAllUrl + "/ /addinfo?type=" + productType + "&searchtext=" + searchTxt;
                    }

                } else {
                    if ($scope.requestId !== undefined) {
                        selectAllUrl = appUrlService.selectAllUrl + '/' + $scope.requestId + "/addinfo?type=" + productType;

                    } else {
                        selectAllUrl = appUrlService.selectAllUrl + "/ /addinfo?type=" + productType;
                    }

                }
                if ($scope.requestId) {
                    $http({
                        method: "PUT",
                        url: selectAllUrl,
                        data: [],
                    }).success(function(resp) {
                         $("#loaderContainer").hide();
                        $modalInstance.close();
                        $state.go('root.versions');
                    }).error(function() {
                         $("#loaderContainer").hide();
                        $modalInstance.close();
                        errorModal = modalService.init("commonModalTemplate.html", "modalController", errorMessagesService.productsUpdateErrormsg, {
                            class: "update-overlay"
                        })();
                    });
                } else {
                    $http({
                        method: "PUT",
                        url: selectAllUrl,
                        data: []
                    }).success(function(resp) {
                         $("#loaderContainer").hide();
                        if (resp.primaryId) {
                            $modalInstance.close();
                            $scope.requestId = resp.primaryId;
                            sessionStorage.setItem('requestId', resp.primaryId);
                            $state.go('root.versions');
                        }

                    }).error(function() {
                         $("#loaderContainer").hide();
                        $modalInstance.close();
                        errorModal = modalService.init("commonModalTemplate.html", "modalController", errorMessagesService.productsUpdateErrormsg, {
                            class: "update-overlay"
                        })();
                    })
                }
            }



            $scope.submitAllVersionsOrModels = function() {
                $modalInstance.close();
                 $("#loaderContainer").show();
                searchTxt = $("#avaliableProductsGrid").bootstrapTable('getSrchTxt');
                $scope.requestId = sessionStorage.requestId;
                 radioBtn = sessionStorage.radioBtnSelected;
                if (radioBtn === "Softwares") {
                    productType = "softwareproductversions";
                } else if (radioBtn === "Hardwares") {
                    productType = "hardwareproductmodels"
                }
                if (typeof searchTxt === "string") {

                    selectAllUrl = appUrlService.selectAllUrl + '/' + $scope.requestId + "/addinfo?type=" + productType + "&searchtext=" + searchTxt;

                } else {

                    selectAllUrl = appUrlService.selectAllUrl + '/' + $scope.requestId + "/addinfo?type=" + productType;
                }
                $http({
                    method: "PUT",
                    url: selectAllUrl,
                    data: [],
                }).success(function(resp) {
                     $("#loaderContainer").hide();
                    $modalInstance.close();
                    previewModal = modalService.init("previewModalTemplate.html", "previewController", "", {
                        class: "preview-overlay"
                    })();
                }).error(function() {
                     $("#loaderContainer").hide();
                    $modalInstance.close();
                    errorModal = modalService.init("commonModalTemplate.html", "modalController", errorMessagesService.versionsUpdateErrormsg, {
                        class: "update-overlay"
                    })();
                });

            }

        }

    ]);

});
