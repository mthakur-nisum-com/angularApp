define(['controllers/controllerModule', 'jquery'], function(controllerModule, $) {

    controllerModule.controller('categoriesController', ["$rootScope", '$state', '$http', '$scope', 'sharedService', "modalService", "errorMessagesService", "appUrlService",
        function($rootScope, $state, $http, $scope, sharedService, modalService, errorMessagesService, appUrlService) {
            var radioBtn = sessionStorage.radioBtnSelected;
            if (radioBtn === "Softwares") {
                $scope.VersionsOrModels = "Versions";
            } else if (radioBtn === "Hardwares") {
                $scope.VersionsOrModels = "Models";
            } else if (radioBtn === undefined) {
                $scope.VersionsOrModels = "Versions";
            }
            var errorModal;
            $scope.availableCategories = [];
            $scope.selectedCategories = [];
            $scope.availableCategoriesLength = 0;
            $scope.selectedCategoriesLength = 0;
           // $scope.viewLoading = true;
            $("#loaderContainer").show();
            $scope.requestId = sessionStorage.requestId;

            if ($scope.requestId) {
                var getSelectedCategoriesUrl = appUrlService.getSelectedCategoriesUrl + $scope.requestId;
                $http.get(getSelectedCategoriesUrl)
                    .success(function(categoriesData) {
                        if(categoriesData.categories){
                            $scope.availableCategories = categoriesData.categories;
                            $scope.availableCategoriesLength = categoriesData.categories.length;
                            $scope.selectedCategories = categoriesData.selectedCategories;
                            $scope.selectedCategoriesLength = categoriesData.selectedCategories.length; 
                        }                       
                        //$scope.viewLoading = false;
                         $("#loaderContainer").hide();

                    }).
                error(function() {
                    //$scope.viewLoading = false;
                       $("#loaderContainer").hide();
                    errorModal = modalService.init("commonModalTemplate.html", "modalController", errorMessagesService.categoriesRetrivalErrormsg, {
                        class: "retrival-overlay"
                    })();

                });

            } else {
                var getCategoriesUrl = appUrlService.getCategoriesUrl;
                $http.get(getCategoriesUrl)
                    .success(function(categoriesData) {
                        if(categoriesData.categories){
                             $scope.availableCategories = categoriesData.categories;
                            $scope.availableCategoriesLength = categoriesData.categories.length;
                        }                       
                        //$scope.viewLoading = false;
                           $("#loaderContainer").hide();

                    }).
                error(function() {
                   // $scope.viewLoading = false;
                      $("#loaderContainer").hide();
                    errorModal = modalService.init("commonModalTemplate.html", "modalController", errorMessagesService.categoriesRetrivalErrormsg, {
                        class: "retrival-overlay"
                    })();

                });
            }

            this.save = function() {
                var selectedCategoriesArray = [],
                    selectedCategoriesArrayLength;
                selectedCategoriesArray = sharedService.getSelectedCategories();
                selectedCategoriesArrayLength = selectedCategoriesArray.length;
                if (selectedCategoriesArrayLength > 100) {
                    errorModal = modalService.init("limitManufaturersModalTemplate.html", "modalController", errorMessagesService.categoriesLimitExceedmsg, {
                        class: "limitExceed-overlay"
                    })();

                } else {

                    if ($scope.requestId) {
                        $http({
                            method: "PUT",
                            url: appUrlService.putCategoriesUrl + $scope.requestId,
                            data: selectedCategoriesArray
                        }).success(function(resp) {
                            if (resp.primaryId) {
                                $state.go("root.productList");
                            }
                        }).error(function() {
                            errorModal = modalService.init("commonModalTemplate.html", "modalController", errorMessagesService.categoriesUpdateErrormsg, {
                                class: "update-overlay"
                            })();
                        });
                    } else {

                        $http({
                            method: "POST",
                            url: appUrlService.generateRequestIdUrl,
                            data: []
                        }).success(function(resp) {
                            if (resp.primaryId) {
                                $scope.requestId = resp.primaryId;
                                sessionStorage.setItem('requestId', resp.primaryId);
                                $http({
                                    method: "PUT",
                                    url: appUrlService.putCategoriesUrl + $scope.requestId,
                                    data: selectedCategoriesArray
                                }).success(function(resp) {
                                    if (resp.primaryId) {
                                        $state.go("root.productList");
                                    }
                                }).error(function() {
                                    errorModal = modalService.init("commonModalTemplate.html", "modalController", errorMessagesService.categoriesUpdateErrormsg, {
                                        class: "update-overlay"
                                    })();
                                });

                            }

                        }).error(function() {
                            errorModal = modalService.init("commonModalTemplate.html", "modalController", errorMessagesService.categoriesUpdateErrormsg, {
                                class: "update-overlay"
                            })();
                        })

                    }
                }
            }
        }

    ]);

});
