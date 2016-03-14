define(['uiRouter',
		'bootstrap',
		'ui-bootstrap',
		'controllers/requestInfoController',
		'controllers/headerController',
		'controllers/modalController',
		'services/appUrlService',
		'services/sharedService',
		'services/modalService',
		"bootstrap","bootstrapTable","bootStrapAngularTable"], function () {
    var RequestApp = angular.module('Request',['ui.router','ui.bootstrap','controllerModule',"serviceModule","bsTable"]);		
    return RequestApp;
});