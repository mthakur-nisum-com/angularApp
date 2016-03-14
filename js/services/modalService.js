define(['services/serviceModule'], function(serviceModule) {

serviceModule.factory('modalService', ["$uibModal", function($modal) {   
        	 var templatePath = "views/modalTemplates/";
            return {
                setTemplatePath: function(path) {
                    templatePath = path;
                },

                init: function(tempName, modalController, localScope, config) {

                    var config = config ||{};
                    if (config && config.templatePath) {
                        templatePath = config.templatePath;
                    }
                    config.class=config.class|| "";
                    return function() {
                        var modalInstance = $modal.open({
                            templateUrl: templatePath + tempName,
                            controller: modalController,
                            windowClass:config.class,
                            keyboard:config.keyboard || false,
                            backdrop : config.backdrop || "static",
                           resolve: {
                              callerScope: function() {
                               return localScope;
                              }
                            }

                        });
                       
                        return modalInstance;
                        
                    }

                }
            };
        }

        ]);
 

});