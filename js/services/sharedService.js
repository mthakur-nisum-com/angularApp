define(['services/serviceModule'], function(serviceModule) {

    serviceModule.factory('sharedService', ['$http', '$window',
        function($http, $window) {
            var requestId, selectedRadioBtn, selectedrows = [],
                selectedVersions = [],
                selectedSoftwares = [],
                selectedHardwares = [],
                selectedManufacturers = [],
                selectedCategories = [];

            return {

                setrequestId: function(reqId) {
                    requestId = reqId;
                },
                getrequestId: function() {
                    return requestId;
                },

                setSelectedProductsRadioBtn: function(selectedValue) {
                    selectedRadioBtn = selectedValue;
                },
                getSelectedProductsRadioBtn: function() {
                    return selectedRadioBtn;
                },

                setSelectedRows: function(selectedRows) {
                    selectedrows = selectedRows;
                },
                getSelectedRows: function() {
                    return selectedrows;
                },

                setSelectedSoftwareRows: function(selectedsoftwares) {
                    selectedSoftwares = selectedsoftwares;
                },
                getSelectedSoftwareRows: function() {
                    return selectedSoftwares;
                },
                setSelectedHardwareRows: function(selectedhardwares) {
                    selectedHardwares = selectedhardwares
                },
                getSelectedHardwareRows: function() {
                    return selectedHardwares;
                },

                setSelectedVersions: function(selectedversions) {
                    selectedVersions = selectedversions;
                },
                getSelectedVersions: function() {
                    return selectedVersions;
                },
                setSelectedManufacturers: function(selectedmanufactrers) {
                    selectedManufacturers = selectedmanufactrers;
                },
                getSelectedManufacturers: function() {
                    return selectedManufacturers;
                },
                setSelectedCategories: function(selectedcategories) {
                    selectedCategories = selectedcategories;
                },
                getSelectedCategories: function() {
                    return selectedCategories;
                }
            }
        }
    ]);
});
