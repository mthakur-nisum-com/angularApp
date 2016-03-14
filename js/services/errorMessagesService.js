define(['services/serviceModule'], function(serviceModule) {

    serviceModule.factory('errorMessagesService', [function() {

            return {

                /*Manufacturers Error Msgs*/

                "manufacturersRetrivalErrormsg": "The Manufacturers data cannot be retrieved for now.Please try again later.",
                "manufacturersUpdateErrormsg": "Your request cannot be processed for now.Please try again later.",
                "manufacturersLimitExceedmsg": "The limit to select Manufactures cannot be greater than 100 !!.",

                /* Categories Error Msgs*/

                "categoriesRetrivalErrormsg": "The Categories data cannot be retrieved for now.Please try again Later.",
                "categoriesUpdateErrormsg": "Your request cannot be processed for now.Please try again later.",
                "categoriesLimitExceedmsg": "The limit to select Categories cannot be greater than 100 !!.",

                /*Products Error Msgs*/

                "productsUpdateErrormsg": "Your request cannot be processed for now.Please try again later.",
                "getSelectedProductsErrormsg": "Your Selected Products data cannot be retrieved for now.Please try again Later",

                /*Versions or Models Error Msgs */

                "versionsUpdateErrormsg": "Your request cannot be processed for now.Please try again later.",
                "getSelectedVersionsErrormsg": "Your Selected Versions data cannot be retrieved for now.Please try again Later",
                "getSelectedModelsErrormsg": "Your Selected Models data cannot be retrieved for now.Please try again Later",
                "additionalMsg": "Only the latest 5,000 records will be selected.",

                /*Preview Overlay Error Msgs */
                "previewErrormsg": "Your request cannot be processed now.Please try again later!",
                "finalSubmitSuccessMsg": "Your data has been successfully submitted.",
                "finalSubmitErrorMsg": "Your request cannot be processed now.Please try again later or contact Adminstrator",



            }
        }

    ]);


});
