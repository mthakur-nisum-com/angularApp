define(['controllers/controllerModule', 'jquery'], function(controllerModule, $) {

    controllerModule.controller('modalController', ["$scope", "$state", "$modalInstance", "$rootScope", "callerScope",
        function($scope, $state, $modalInstance, $rootScope, callerScope) {
            $scope.ajaxFailuremsg = callerScope;
            $scope.finalSuccessMsg = callerScope;
            $scope.ok = function() {
                $modalInstance.close();
                window.location.reload();
            };

            $scope.cancel = function() {
                $modalInstance.dismiss("cancel");
            };

            $scope.limitExceed = function() {
                $modalInstance.dismiss("limit");
            };
            $scope.redirect = function() {
                $modalInstance.dismiss("successOverlay");
                $state.go("root.manufacturers");
            }


        }

    ]);

});
