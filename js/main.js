require.config({
   // baseUrl: "../js",
    paths: {
        //path for modules
        "bdnaApp": "modules/BdnaModule/app",
        "bdnaConfig": "modules/BdnaModule/config",
        "configApp":"modules/ConfigModule/app",
        "configConfig":"modules/ConfigModule/config",
        "requestApp":"modules/RequestModule/app",
        "requestConfig":"modules/RequestModule/config",

      
        //paths for libraries
        "jquery": "lib/jquery",
        "angular": 'lib/angular',
        "bootstrap": "lib/bootstrap.min",
        'bootstrapTable':"lib/bootstrap-table",
        'bootStrapAngularTable':"lib/bootstrap-table-angular",
        'angularRoute': 'lib/angular-route',
        'angularAnimate': 'lib/angular-animatee',
        'angularResource': 'lib/angular-resource',
        "services": "services",
        "directives": "directives",
        "controllers": "controllers",
        "uiRouter": "lib/angular-ui-router",        
        "underscore": "lib/min/underscore-min",
        "ngDialog": "lib/ngDialog",
        "uiRouterStyles": "lib/ui-router-styles",       
        "modules":"modules",
        'ui-bootstrap':"lib/ui-bootstrap"
    },
    shim: {
        'angular': {
            'exports': 'angular'
        },
        'underscore': {
            'exports': '_'
        },
        "bootstrap" : { "deps" :['jquery'] },
        "bootstrapTable":{"deps":['bootstrap']},
        "bootStrapAngularTable":{"deps":["bootstrapTable"]}
    }
});
function start() {
    require(["jquery", 'angular'], function($, angular) {
        if(location.pathname.indexOf("index.html")>-1){
            require(["bdnaConfig"], function(defaultConfig) {
                angular.bootstrap(document, ["BDNA"]);
            });
        }
        if(location.pathname.indexOf("config.html")>-1){
            require(["configConfig"], function(configConfig) {
                angular.bootstrap(document, ["Config"]);
            });
        }
        if(location.pathname.indexOf("reqInfo.html")>-1){
            require(["requestConfig"], function(configConfig) {
                angular.bootstrap(document, ["Request"]);
            });
        }
    });
}
start();
