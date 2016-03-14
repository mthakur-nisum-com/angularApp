define(['uiRouter',
		'bootstrap',
		'ui-bootstrap',
		'controllers/configController',
		'controllers/headerController',
		'controllers/modalController',
		'services/appUrlService',
		'directives/stringToNumberDirective',
		'services/sharedService',
		'services/modalService',
		"bootstrap","bootstrapTable","bootStrapAngularTable"], function () {
    var ConfigApp = angular.module('Config',['ui.router','ui.bootstrap','controllerModule','directiveModule',"serviceModule","bsTable"]);		
    return ConfigApp;
});