define(['controllers/controllerModule', 'jquery', 'underscore', 'bootstrapTable'], function(controllerModule, $, _, bootstrapTable) {

    controllerModule.controller('versionsController', ["$rootScope", '$state', '$http', '$scope', 'sharedService', 'appUrlService', 'modalService', '$location','errorMessagesService',
        function($rootScope, $state, $http, $scope, sharedService, appUrlService, modalService, $location,errorMessagesService) {
            $scope.selectionmsg = "Please Select atleast one Product to proceed further";
            $scope.versionsUpdateErrormsg = "Your Selected data cannot be updated for now.Please try again Later.";
            $scope.requestId = sessionStorage.requestId;
            $scope.availableVersionsGrid = {};
            $scope.selectedVersionsGrid = {};
            var temp = [],
                temp2 = [],
                productType, softwareVersionsSearchUrl, hardwareModelsSearchUrl, operateEvents = {},
                dataModelsColumnDefs, previewModal, versionscolumnDefs, selectedVersionsColumnDefs, selectedDataModalsColumnDefs, commonOptionsForGrid, errorModal, popup,
                selectedVersions, selectedVersionsUrl, selectedModelsUrl, selectedVersionsStore = [];
            dataModelsColumnDefs = [{
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
            }, {
                field: 'model',
                title: 'Model',
                align: 'left',
                valign: 'top',
                sortable: false
            }];
            versionscolumnDefs = [{
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
                field: 'software',
                title: 'Software Product',
                align: 'left',
                valign: 'top',
                sortable: false
            }, {
                field: 'version',
                title: 'Version',
                align: 'left',
                valign: 'top',
                sortable: false
            }];
            selectedVersionsColumnDefs = [{
                field: 'delete',
                title: '<i class="glyphicon glyphicon-trash trash"></i>',
                align: 'center',
                events: {
                    'click .remove': function(e, value, row, index) {
                        $("#selectedVersionsGrid").bootstrapTable('remove', {
                            field: 'id',
                            values: [row.id]
                        });
                        temp = sharedService.getSelectedVersions();
                        $.each(temp, function(item) {
                            if (temp[item].id === row.id) {
                                temp2 = _.difference(temp, temp[item]);
                            }
                        })
                        sharedService.setSelectedVersions(temp2);

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
                title: 'Software',
                align: 'left',
                valign: 'top',
                sortable: false
            }, {
                field: 'version',
                title: 'Version',
                align: 'left',
                valign: 'top',
                sortable: false
            }];
            selectedDataModalsColumnDefs = [{
                field: 'operate',
                title: '<i class="glyphicon glyphicon-trash trash"></i>',
                align: 'left',
                events: {
                    'click .remove': function(e, value, row, index) {
                        $("#selectedVersionsGrid").bootstrapTable('remove', {
                            field: 'id',
                            values: [row.id]
                        });
                        temp = sharedService.getSelectedVersions();
                        $.each(temp, function(item) {
                            if (temp[item].id === row.id) {
                                temp2 = _.difference(temp, temp[item]);
                            }
                        })
                        sharedService.setSelectedVersions(temp2);

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
                field: 'hardware',
                title: 'Hardware',
                align: 'left',
                valign: 'top',
                sortable: false
            }, {
                field: 'model',
                title: 'Model',
                align: 'left',
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

            commonOptionsForGrid = {
                    data: {},
                    cache: false,
                    height: 400,
                    striped: true,
                    pagination: true,
                    customClass: 'ProductsAvailability',
                    pageSize: 10,
                    pageList: [10, 25, 50],
                    minimumCountColumns: 2,
                    clickToSelect: false,
                    maintainSelected: true
                }
                /*Start :Initial Data Load(GET Call) into Available Grid based on selection in Products Page.*/
                // productType = sharedService.getSelectedProductsRadioBtn();
            productType = sessionStorage.radioBtnSelected;
            if (productType === "Hardwares") {
                $scope.VersionsOrModels = "Models";
                selectedModelsUrl = appUrlService.getSelectedProductModelsUrl + $scope.requestId + '&selectedproductmodels=true';
                $scope.labelForSelectedGrid = "Selected Product Models(TROUX)";
                $scope.availableVersionsGrid = {
                    options: {
                        columns: dataModelsColumnDefs,
                        dataField: "hardwareProductModels",
                        url: appUrlService.getProductModelsUrl + $scope.requestId,
                        sidePagination: "server",
                        search: true,
                        productType: 'Hardware Product Models(BDNA)'
                    }
                }
                $scope.selectedVersionsGrid = {
                    options: {
                        columns: selectedDataModalsColumnDefs,
                        sidePagination: "client"
                    }
                }
                   $("#loaderContainer").show();
                $http.get(selectedModelsUrl)
                    .success(function(selectedData) {
                        $scope.selectedVersionsGrid.options.data = selectedData.selectedHardwareProductModels;
                        sharedService.setSelectedVersions(selectedData.selectedHardwareProductModels);
                           $("#loaderContainer").hide();
                    }).
                error(function() {
                       $("#loaderContainer").hide();
                   errorModal = modalService.init("commonModalTemplate.html", "modalController", errorMessagesService.getSelectedModelsErrormsg, {
                                class: "update-overlay"
                            })();
                });
            } else if (productType === "Softwares") {
                $scope.VersionsOrModels = "Versions";
                selectedVersionsUrl = appUrlService.getSelectedVersionsUrl + $scope.requestId + '&selectedproductversions=true';
                $scope.labelForSelectedGrid = "Selected Product Versions(TROUX)";
                $scope.availableVersionsGrid = {
                    options: {
                        columns: versionscolumnDefs,
                        dataField: "softwareProductVersions",
                        url: appUrlService.getVersionsUrl + $scope.requestId,
                        sidePagination: "server",
                        search: true,
                        productType: 'Software Product Versions(BDNA)'
                    }
                }
                $scope.selectedVersionsGrid = {
                    options: {
                        columns: selectedVersionsColumnDefs,
                        sidePagination: "client"
                    }
                }
                   $("#loaderContainer").show();
                $http.get(selectedVersionsUrl)
                    .success(function(selectedData) {
                        $scope.selectedVersionsGrid.options.data = selectedData.selectedSoftwareProductVersions;
                        sharedService.setSelectedVersions(selectedData.selectedSoftwareProductVersions);
                           $("#loaderContainer").hide();
                    }).
                error(function() {
                       $("#loaderContainer").hide();
                   errorModal = modalService.init("commonModalTemplate.html", "modalController", errorMessagesService.getSelectedVersionsErrormsg, {
                                class: "update-overlay"
                            })();
                });
            }
            $scope.availableVersionsGrid.options = angular.extend({}, $scope.availableVersionsGrid.options, commonOptionsForGrid);
            $scope.selectedVersionsGrid.options = angular.extend({}, $scope.selectedVersionsGrid.options, commonOptionsForGrid);
            /*End :Initial Data Load(GET Call) into Available Grid based on selection in Products Page.*/

            selectingAllRecords = function() {
                var totalCount = parseInt($('.total').text());
                if (totalCount >= 5000) {
                    errorModal = modalService.init("selectAllModelsOrVersionsModalTemplate.html", "selectAllRecordsOverlayController", errorMessagesService.additionalMsg, {
                        class: "selectAll-overlay"
                    })();
                } else {
                    errorModal = modalService.init("selectAllModelsOrVersionsModalTemplate.html", "selectAllRecordsOverlayController", '', {
                        class: "selectAll-overlay"
                    })();
                }
            }


            /*Start: Function to Add Selected items in Available Grid to Selected Grid*/
            $scope.addItems = function() {
                    var temp = [];
                    temp = sharedService.getSelectedVersions();
                    var $availableTable = $("#availableVersionsGrid");
                    selectedVersions = $availableTable.bootstrapTable('getSelections');
                    $("#availableVersionsGrid").bootstrapTable('uncheckAll');
                    //selectedVersionsStore=_.difference(selectedVersionsStore,selectedVersions);       
                    $.each(selectedVersions, function(index, obj) {
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

                    selectedVersions = temp;
                    if (selectedVersions.length !== 0) {
                        $("#productsFormSubmit").removeClass('disabled grayOut').attr('disabled', false);
                    } else {
                        $("#productsFormSubmit").addClass('disabled grayOut').attr('disabled', true);
                    }

                    //console.log(selectedVersions);
                    sharedService.setSelectedVersions(selectedVersions);
                    $scope.selectedVersionsGrid.options.data = selectedVersions;
                    $("#selectedVersionsGrid").bootstrapTable('load', selectedVersions);

                }
                /*End: Function to Add Selected items in Available Grid to Selected Grid*/



            this.save = function() {
                   $("#loaderContainer").show();
                $scope.successfullySaved = "Successfully Saved your data. Submission is in Progress...";
                var putUrlfromProducts;
                //productType = sharedService.getSelectedProductsRadioBtn();
                productType = sessionStorage.radioBtnSelected;
                var $selectedProductsTable = $("#selectedVersionsGrid");
                var totalselection = $selectedProductsTable.bootstrapTable("getData");

                angular.forEach(totalselection, function(item) {
                    delete item.state;
                });


                if (productType === "Softwares") {
                    putUrlfromProducts = appUrlService.postVersionsUrl + $scope.requestId;
                } else if (productType === "Hardwares") {
                    putUrlfromProducts = appUrlService.postProductModelsUrl + $scope.requestId;
                }
                if (totalselection.length === 0) {
                      $("#loaderContainer").hide();
                    $("#productsFormSubmit").addClass('disabled grayOut').attr('disabled', true);
                } else {
                    $http({
                        method: "PUT",
                        url: putUrlfromProducts,
                        data: totalselection
                    }).success(function(resp) {
                           $("#loaderContainer").hide();
                        previewModal = modalService.init("previewModalTemplate.html", "previewController", "", {
                            class: "preview-overlay"
                        })();
                    }).error(function() {
                           $("#loaderContainer").hide();
                        errorModal = modalService.init("commonModalTemplate.html", "modalController", $scope.versionsUpdateErrormsg, {
                            class: "update-overlay"
                        })();

                    });

                }
            }
        }
    ]);
});
