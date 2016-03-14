define(['services/serviceModule'], function(serviceModule) {

    serviceModule.factory('appUrlService', [function() {

            return {

                /* Url to Generate fresh request id*/

                'generateRequestIdUrl': '/bdnaint/services/manufacturers/',

                /* Manufacturers Page Urls */

                'getManufacturersUrl': '/bdnaint/services/manufacturers/',

                'getSelectedManufacturersUrl': '/bdnaint/services/manufacturers?request_id=',

                'postManufacturersUrl': '/bdnaint/services/manufacturers/',


                /*  Categories Page Urls */

                'getCategoriesUrl': '/bdnaint/services/category/',

                'getSelectedCategoriesUrl': '/bdnaint/services/category?request_id=',

                'putCategoriesUrl': '/bdnaint/services/category/',

                /*Products Page Urls*/
                'getSoftwareUrl': '/bdnaint/services/softwareproducts?request_id=',
                'getHardwareUrl': '/bdnaint/services/hardwareproducts?request_id=',
                'getSelectedSoftwareUrl': '/bdnaint/services/softwareproducts?request_id=',
                'getSelectedHardwareUrl': '/bdnaint/services/hardwareproducts?request_id=',
                'getAllSoftwareUrl': '/bdnaint/services/softwareproducts',
                'getAllHardwareUrl': '/bdnaint/services/hardwareproducts',
                'putSoftwareProductsUrl': '/bdnaint/services/softwareproducts/',
                'putHardwareProductsUrl': '/bdnaint/services/hardwareproducts/',



                /* Versions Page Urls*/

                'getVersionsUrl': '/bdnaint/services/softwareproductversions?request_id=',

                'getVersionsSearchUrl': '/bdnaint/services/softwareproductversions/',

                'getSelectedVersionsUrl': '/bdnaint/services/softwareproductversions?request_id=',

                'postVersionsUrl': '/bdnaint/services/softwareproductversions/',

                'getProductModelsUrl': '/bdnaint/services/hardwareproductmodels?request_id=',

                'getModelsSearchUrl': '/bdnaint/services/hardwareproductmodels/',

                'getSelectedProductModelsUrl': '/bdnaint/services/hardwareproductmodels?request_id=',

                'postProductModelsUrl': '/bdnaint/services/hardwareproductmodels/',

                /* Service Configuration Urls*/

                'getConfigurationsUrl': '/bdnaint/services/configuration/technopedia',

                'updateConfigurationsUrl': '/bdnaint/services/configuration/technopedia',

                'fetchDataUrl': '/bdnaint/services/extraction/viewhistory',

                'fetchSelectedDataUrl': '/bdnaint/services/extraction',

                'getBadDatesUrl': '/bdnaint/services/configuration/baddates',

                'getEmailUrl': '/bdnaint/services/configuration/general',
				'getImportOptionsUrl':'/bdnaint/services/configuration/trouximpoptions',

                /* Preview Overlay Urls*/

                'getPreviewUrl': '/bdnaint/services/preview?request_id=',

                'finalSubmitUrl': '/bdnaint/services/trxapi/',
                
                /*SelectAll Overlays*/
                'selectAllUrl': '/bdnaint/services/request'
            }
        }

    ]);


});
