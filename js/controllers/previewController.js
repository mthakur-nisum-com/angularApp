define(['controllers/controllerModule', 'jquery'], function(controllerModule, $) {

    controllerModule.controller('previewController', ["$scope", "$http", "$state", "$modalInstance", "$rootScope", "callerScope", "sharedService", "appUrlService", "modalService", "errorMessagesService",
        function($scope, $http, $state, $modalInstance, $rootScope, callerScope, sharedService, appUrlService, modalService, errorMessagesService) {
            var columHeaders = [],
                errorModal, getPreviewDataUrl, productType;
            $scope.requestId = sessionStorage.requestId;
            var radioBtn = sessionStorage.radioBtnSelected;
            if (radioBtn === "Softwares") {
                productType = "software";
            } else if (radioBtn === "Hardwares") {
                productType = "hardware"
            }
            $scope.previewGrid = {
                options: {
                    data: [],
                    cache: false,
                    height: 400,
                    striped: true,
                    pagination: true,
                    pageSize: 10,
                    pageList: [10, 25, 50],
                    sidePagination: "client",
                    customClass: 'previewTable',
                }
            };
            getPreviewDataUrl = appUrlService.getPreviewUrl + $scope.requestId + "&type=" + productType;
            $("#loaderContainer").show();
            $http.get(getPreviewDataUrl)
                .success(function(responseData) {
                    angular.forEach(responseData.headers, function(value, key) {
                        columHeaders.push({
                            "title": value,
                            "field": value
                        })
                    });
                    $scope.previewGrid.options.columns = columHeaders;
                    $scope.previewGrid.options.data = responseData.content;
                    $("#loaderContainer").hide();
                }).
            error(function() {
                $("#loaderContainer").hide();
                $modalInstance.dismiss("cancel");
                errorModal = modalService.init("commonModalTemplate.html", "modalController", errorMessagesService.previewErrormsg, {
                    class: "previewErrormsg-overlay"
                })();
            });

            $scope.cancel = function() {
                $modalInstance.dismiss("cancel");
                location.reload();
            };

            $scope.finalSubmit = function() {

                $("#loaderContainer").show();
                finalSubmitUrl = appUrlService.finalSubmitUrl + $scope.requestId + "?type=" + productType;
                $http({
                    method: "POST",
                    url: finalSubmitUrl,
                    data: []
                }).success(function(resp) {

                    $("#loaderContainer").hide();
                    if (resp.status === "Completed") {
                        $modalInstance.dismiss("cancel");
                        sessionStorage.setItem('requestId', "");
                        errorModal = modalService.init("finalSubmitModalTemplate.html", "modalController", errorMessagesService.finalSubmitSuccessMsg, {
                            class: "submissionSuccess-overlay"
                        })();
                    } else {

                        $("#loaderContainer").hide();
                        errorModal = modalService.init("limitManufaturersModalTemplate.html", "modalController", errorMessagesService.finalSubmitErrorMsg, {
                            class: "previewErrormsg-overlay"
                        })();
                    }
                }).error(function() {

                    $("#loaderContainer").hide();
                    errorModal = modalService.init("limitManufaturersModalTemplate.html", "modalController", errorMessagesService.finalSubmitErrorMsg, {
                        class: "previewErrormsg-overlay"
                    })();
                });


            }
        }

    ]);

});
