define(['controllers/controllerModule', 'jquery', 'underscore', 'bootstrapTable'], function(controllerModule, $, _, bootstrapTable) {

    controllerModule.controller('productListController', ["$rootScope", '$state', '$http', '$scope', 'sharedService', 'modalService', "errorMessagesService", "appUrlService", '$location',
        function($rootScope, $state, $http, $scope, sharedService, modalService, errorMessagesService, appUrlService, $location) {
            var temp = [],
                temp2 = [],
                getSoftwareUrl, getHardwareUrl, getSelectedSoftwareUrl, getSelectedHardwareUrl, getAllSoftwareUrl, getAllHardwareUrl, putUrlfromProducts,
                product, softwareProductSearchUrl, hardwareProductSearchUrl, operateEvents = {},
                traversebackurl, sftware, hrdware, popup, errorModal;
            var radioBtn = sessionStorage.radioBtnSelected;
            $scope.productType = "";
            if (radioBtn === "Softwares") {
                $scope.productType = "Softwares";
                $scope.VersionsOrModels = "Versions";
            } else if (radioBtn === "Hardwares") {
                $scope.productType = "Hardwares";
                $scope.VersionsOrModels = "Models";
            } else if (radioBtn === undefined) {
                $scope.productType = "Softwares";
                $scope.VersionsOrModels = "Versions";
            }
            $scope.requestId = '';
            $scope.requestId = sessionStorage.requestId;
            sessionStorage.setItem('radioBtnSelected', $scope.productType);
            sharedService.setSelectedVersions([]);
            $scope.availableProductsGrid = {};
            var hardwareColumnDefs = [{
                field: 'state',
                checkbox: true
            }, {
                field: 'manufacture',
                title: 'Manufacturer',
                align: 'left',
                valign: 'top',
                sortable: false
            }, {
                field: 'category',
                title: 'Category',
                align: 'left',
                valign: 'top',
                sortable: false
            }, {
                field: 'hardware',
                title: 'Hardware Product',
                align: 'left',
                valign: 'top',
                sortable: false
            }];
            var softwarecolumnDefs = [{
                field: 'state',
                checkbox: true,
            }, {
                field: 'manufacture',
                title: 'Manufacturer',
                align: 'left',
                valign: 'top',
                sortable: false
            }, {
                field: 'category',
                title: 'Category',
                align: 'left',
                valign: 'top',
                sortable: false
            }, {
                field: 'software',
                title: 'Software Product',
                align: 'left',
                valign: 'top',
                sortable: false
            }];
            var selectedSoftwareColumnDefs = [{
                field: 'delete',
                title: '<i class="glyphicon glyphicon-trash trash"></i>',
                align: 'center',
                events: {
                    'click .remove': function(e, value, row, index) {
                        $("#selectedProductsGrid").bootstrapTable('remove', {
                            field: 'id',
                            values: [row.id]
                        });
                        temp = sharedService.getSelectedSoftwareRows();
                        $.each(temp, function(item) {
                            if (temp[item].id === row.id) {
                                temp2 = _.difference(temp, temp[item]);
                            }
                        })
                        sharedService.setSelectedSoftwareRows(temp2);
                    }
                },
                formatter: deleteIcon
            }, {
                field: 'manufacture',
                title: 'Manufacturer',
                align: 'left',
                valign: 'top',
                sortable: false
            }, {
                field: 'category',
                title: 'Category',
                align: 'left',
                valign: 'top',
                sortable: false
            }, {
                field: 'software',
                title: 'Software Product',
                align: 'left',
                valign: 'top',
                sortable: false
            }];
            var selectedHardwareColumnDefs = [{
                field: 'operate',
                title: '<span class="glyphicon glyphicon-trash trash"></span>',
                align: 'center',
                events: {
                    'click .remove': function(e, value, row, index) {
                        $("#selectedProductsGrid").bootstrapTable('remove', {
                            field: 'id',
                            values: [row.id]
                        });

                        temp = sharedService.getSelectedHardwareRows();
                        $.each(temp, function(item) {
                            if (temp[item].id === row.id) {
                                temp2 = _.difference(temp, temp[item]);
                            }
                        })
                        sharedService.setSelectedHardwareRows(temp2);
                    }
                },
                formatter: deleteIcon
            }, {
                field: 'manufacture',
                title: 'Manufacturer',
                align: 'center',
                valign: 'top',
                sortable: false
            }, {
                field: 'category',
                title: 'Category',
                align: 'center',
                valign: 'top',
                sortable: false
            }, {
                field: 'hardware',
                title: 'Hardware Product',
                align: 'center',
                valign: 'top',
                sortable: false
            }];

            function deleteIcon(value, row, index) {
                return [
                    '<a class="remove" href="javascript:void(0)" title="Remove" >',
                    '<i class="glyphicon glyphicon-trash trash"></i>',
                    '</a>'
                ].join('');
            };

            $scope.availableProductsGrid = {
                options: {
                    data: {},
                    cache: false,
                    height: 400,
                    striped: true,
                    customClass: 'ProductsAvailability',
                    pagination: true,
                    sidePagination: "server",
                    pageSize: 10,
                    pageList: [10, 25, 50],
                    search: true,
                    minimumCountColumns: 2,
                    clickToSelect: false,
                    maintainSelected: true
                }
            };


            $scope.selectedProductsGrid = {
                options: {
                    data: {},
                    cache: false,
                    height: 400,
                    striped: true,
                    customClass: 'SelectedProducts',
                    pagination: true,
                    sidePagination: "client",
                    pageSize: 10,
                    pageList: [10, 25, 50],
                    search: false,
                    minimumCountColumns: 2,
                    clickToSelect: false,
                    maintainSelected: true
                }
            };


            var start = function(getSoftwareUrl, getHardwareUrl, getSelectedSoftwareUrl, getSelectedHardwareUrl) {

                product = sessionStorage.radioBtnSelected;
                if (product === "Softwares") {
                    $scope.VersionsOrModels = "Versions";
                    $scope.availableProductsGrid.options.columns = softwarecolumnDefs;
                    $scope.availableProductsGrid.options.dataField = "softwareProducts";
                    $scope.availableProductsGrid.options.productType = "Software Products(BDNA)";
                    $scope.availableProductsGrid.options.url = getSoftwareUrl;
                    $("#avaliableProductsGrid").bootstrapTable('selectPage', 1);
                    $scope.selectedProductsGrid.options.columns = selectedSoftwareColumnDefs;
                    if (getSelectedSoftwareUrl) {
                        $("#loaderContainer").show();
                        $http.get(getSelectedSoftwareUrl)
                            .success(function(selectedData) {
                                $scope.selectedProductsGrid.options.data = selectedData.selectedSoftwareProducts;
                                sharedService.setSelectedSoftwareRows(selectedData.selectedSoftwareProducts);
                                $("#loaderContainer").hide();
                            }).
                        error(function() {
                               $("#loaderContainer").hide();
                            errorModal = modalService.init("commonModalTemplate.html", "modalController", errorMessagesService.getSelectedProductsErrormsg, {
                                class: "update-overlay"
                            })();

                        });
                    } else {
                        $scope.selectedProductsGrid.options.data = [];
                    }

                } else if (product === "Hardwares") {
                    $scope.VersionsOrModels = "Models";
                    $scope.availableProductsGrid.options.columns = hardwareColumnDefs;
                    $scope.availableProductsGrid.options.dataField = "hardwareProducts";
                    $scope.availableProductsGrid.options.productType = "Hardware Products(BDNA)";
                    $scope.availableProductsGrid.options.url = getHardwareUrl;
                    $("#avaliableProductsGrid").bootstrapTable('selectPage', 1);
                    $scope.selectedProductsGrid.options.columns = selectedHardwareColumnDefs;
                    if (getSelectedHardwareUrl) {
                           $("#loaderContainer").show();
                        $http.get(getSelectedHardwareUrl)
                            .success(function(selectedData) {
                                $scope.selectedProductsGrid.options.data = selectedData.selectedHardwareProducts;
                                sharedService.setSelectedHardwareRows(selectedData.selectedHardwareProducts);
                                   $("#loaderContainer").hide();
                            }).
                        error(function() {
                               $("#loaderContainer").hide();
                            errorModal = modalService.init("commonModalTemplate.html", "modalController", errorMessagesService.getSelectedProductsErrormsg, {
                                class: "update-overlay"
                            })();
                        });
                    } else {
                        $scope.selectedProductsGrid.options.data = [];
                    }

                }

            }


            var intializeData = function() {
                if ($scope.requestId) {
                    getSoftwareUrl = appUrlService.getSoftwareUrl + $scope.requestId;
                    getHardwareUrl = appUrlService.getHardwareUrl + $scope.requestId;
                    getSelectedSoftwareUrl = appUrlService.getSelectedSoftwareUrl + $scope.requestId + '&selectedproducts=true';
                    getSelectedHardwareUrl = appUrlService.getSelectedHardwareUrl + $scope.requestId + '&selectedproducts=true';
                    start(getSoftwareUrl, getHardwareUrl, getSelectedSoftwareUrl, getSelectedHardwareUrl);
                } else {
                    getAllSoftwareUrl = appUrlService.getAllSoftwareUrl;
                    getAllHardwareUrl = appUrlService.getAllHardwareUrl;
                    getSelectedSoftwareUrl = '';
                    getSelectedHardwareUrl = '';
                    start(getAllSoftwareUrl, getAllHardwareUrl, getSelectedSoftwareUrl, getSelectedHardwareUrl);
                }
            }


            $scope.productsData = function(value) {
                sessionStorage.setItem('radioBtnSelected', value);
                var totalselection =  $("#selectedProductsGrid").bootstrapTable("getData");
                 if(totalselection!==0){
                        $("#productsFormSubmit").removeClass('disabled grayOut').attr('disabled', false);
                 }
                intializeData();
            }

            intializeData();

            selectingAllRecords = function() {
                var totalCount = parseInt($('.total').text());
                if (totalCount >= 5000) {
                    errorModal = modalService.init("selectAllProductsModalTemplate.html", "selectAllRecordsOverlayController", errorMessagesService.additionalMsg, {
                        class: "selectAll-overlay"
                    })();
                } else {
                    errorModal = modalService.init("selectAllProductsModalTemplate.html", "selectAllRecordsOverlayController", '', {
                        class: "selectAll-overlay"
                    })();
                }
            }

            $scope.addItems = function() {
                product = sessionStorage.radioBtnSelected;
                if (product === "Softwares") {
                    temp = sharedService.getSelectedSoftwareRows();
                } else if (product === "Hardwares") {
                    temp = sharedService.getSelectedHardwareRows();
                }
                var $table = $('#avaliableProductsGrid');
                var selectedProductsArray = $table.bootstrapTable('getSelections');
                $("#avaliableProductsGrid").bootstrapTable('uncheckAll');
                $.each(selectedProductsArray, function(index, obj) {
                    var found = false;
                    $.each(temp, function(tempI, tempObj) {
                        if (tempObj.id == obj.id) {
                            found = true;
                            return false;
                        }
                    });

                    if (!found) {
                        temp.push(obj);
                    }
                });

                selectedProductsArray = temp;
                if (selectedProductsArray.length !== 0) {
                    $("#productsFormSubmit").removeClass('disabled grayOut').attr('disabled', false);
                } else {
                    $("#productsFormSubmit").addClass('disabled grayOut').attr('disabled', true);
                }
                if (product === "Softwares") {
                    $scope.selectedProductsGrid.options.data = selectedProductsArray;
                    $("#selectedProductsGrid").bootstrapTable('load', selectedProductsArray);
                    sharedService.setSelectedSoftwareRows(selectedProductsArray);
                } else if (product === "Hardwares") {
                    $scope.selectedProductsGrid.options.data = selectedProductsArray;
                    $("#selectedProductsGrid").bootstrapTable('load', selectedProductsArray);
                    sharedService.setSelectedHardwareRows(selectedProductsArray);
                }
            }


            this.save = function() {
                   $("#loaderContainer").show();
                product = sessionStorage.radioBtnSelected;
                var $selectedProductsTable = $("#selectedProductsGrid");
                var totalselection = $selectedProductsTable.bootstrapTable("getData");
                console.log(totalselection, "saving")
                if (product === "Softwares") {
                    sharedService.setSelectedSoftwareRows(totalselection);
                    sharedService.setSelectedHardwareRows([]);
                } else if (product === "Hardwares") {
                    sharedService.setSelectedHardwareRows(totalselection);
                    sharedService.setSelectedSoftwareRows([]);
                }
                angular.forEach(totalselection, function(item) {
                    delete item.state;
                });

                if (product === "Softwares") {
                    putUrlfromProducts = appUrlService.putSoftwareProductsUrl;
                } else if (product === "Hardwares") {
                    putUrlfromProducts = appUrlService.putHardwareProductsUrl;
                }

                if (totalselection.length === 0) {
                     $("#loaderContainer").hide();
                    $("#productsFormSubmit").addClass('disabled grayOut').attr('disabled', true);

                } else {

                    if ($scope.requestId) {
                        $http({
                            method: "PUT",
                            url: putUrlfromProducts + $scope.requestId,
                            data: totalselection
                        }).success(function(resp) {
                               $("#loaderContainer").hide();
                            $state.go('root.versions');
                        }).error(function() {
                               $("#loaderContainer").hide();
                            errorModal = modalService.init("commonModalTemplate.html", "modalController", errorMessagesService.productsUpdateErrormsg, {
                                class: "update-overlay"
                            })();

                        });
                    } else {

                        $http({
                            method: "POST",
                            url: appUrlService.generateRequestIdUrl,
                            data: []
                        }).success(function(resp) {
                               $("#loaderContainer").hide();
                            if (resp.primaryId) {
                                $scope.requestId = resp.primaryId;
                                sessionStorage.setItem('requestId', resp.primaryId);
                                $http({
                                    method: "PUT",
                                    url: putUrlfromProducts + $scope.requestId,
                                    data: totalselection
                                }).success(function(resp) {
                                    $state.go('root.versions');
                                }).error(function() {
                                    errorModal = modalService.init("commonModalTemplate.html", "modalController", errorMessagesService.productsUpdateErrormsg, {
                                        class: "update-overlay"
                                    })();

                                });
                            }

                        }).error(function() {
                               $("#loaderContainer").hide();
                            errorModal = modalService.init("commonModalTemplate.html", "modalController", errorMessagesService.productsUpdateErrormsg, {
                                class: "update-overlay"
                            })();
                        })
                    }

                }
            }

        }
    ]);
});
