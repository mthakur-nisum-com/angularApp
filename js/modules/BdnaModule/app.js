define([
    'controllers/manufacturesController',
    'controllers/headerController',
	'controllers/previewController',
    'controllers/categoriesController',
    'controllers/productListController',
    'controllers/versionsController',
    'controllers/modalController',
	'controllers/selectAllRecordsOverlayController',
    'services/sharedService',
    'services/appUrlService',
    'services/modalService',
    'services/errorMessagesService',
    'directives/manufacturersDualListDirective',
    'directives/categoriesDualiListDirective',
    'ui-bootstrap',
    'uiRouter',
    'jquery',
    'uiRouterStyles',    
    'angularAnimate',
    "bootstrap",
    "bootstrapTable",
    "bootStrapAngularTable"
], function() {
    var defaultapp = angular.module('BDNA', ['ui.router', 'uiRouterStyles', 'controllerModule', 'directiveModule', 'serviceModule', "ui.bootstrap", "bsTable"]);
    return defaultapp;
});
