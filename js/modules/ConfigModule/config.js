define(['configApp'], function (app) {

app.config(["$stateProvider", "$urlRouterProvider", "$locationProvider",function($stateProvider,$urlRouterProvider,$locationProvider){

    $stateProvider
    .state('root',{        
         abstract: true,
         url : "",
         views: {
            'header': {
                templateUrl: 'views/common/bootstrap/header.html',
                controller : "headerController as headerCtrl"
            },
            'footer': {
                templateUrl: 'views/common/bootstrap/footer.html'                
            }
        }
    })
    .state('root.configuration',{
        url: '',
        views: {           
            'content@': {
                templateUrl:'views/configuration.html',
                controller : "configController as configCtrl"
            }             
        },
        secured : false
    })
    .state('configuration.titleOne',{
        url: '',
        parent:'content@',
        views: {           
            'test@': {
                template:'views/configuration.html'            }             
        },
        secured : false
    })
    
}]);

});
