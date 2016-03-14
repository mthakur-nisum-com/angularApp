define(['controllers/controllerModule', 'jquery'], function(controllerModule, $) {

    controllerModule.controller('headerController', ['sharedService', '$scope', '$state', function(sharedService, $scope, $state) {

            $scope.newReq = function() {
                window.location = "index.html"
            }
        }

    ]);

});
