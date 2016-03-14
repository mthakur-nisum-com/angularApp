define(['requestApp'], function (app) {	
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
                templateUrl:'views/ViewRequestInfo.html',
                controller : "requestInfoController as reqInfoCtrl"
            }             
        },
        secured : false
    })    
}]);

});
