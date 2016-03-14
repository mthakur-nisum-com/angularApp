define(['bdnaApp'], function(app) {

    app.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
            .state('root', {
                abstract: true,
                url: "",
                views: {
                    'header': {
                        templateUrl: 'views/common/bootstrap/header.html',
                        controller: "headerController as headerCtrl"
                    },
                    'footer': {
                        templateUrl: 'views/common/bootstrap/footer.html'
                    }

                }
            })



        .state('root.manufacturers', {
            url: '',
            views: {
                'content@': {
                    templateUrl: 'views/manufactures.html',
                    controller: "manufacturesController as manufacturesCtrl",
                    title: 'Manufacturers'
                }
            },
            secured: false
        })

        .state('root.manufacturersurl', {
            url: '/',
            views: {
                'content@': {
                    templateUrl: 'views/manufactures.html',
                    controller: "manufacturesController as manufacturesCtrl",
                    title: 'Manufacturers'
                }
            },
            secured: false
        })

        .state('root.categories', {
                url: '/categories',
                views: {
                    'content@': {
                        templateUrl: 'views/categories.html',
                        controller: "categoriesController as categoriesCtrl"
                    }
                },
                secured: false
            })
            .state('root.productList', {
                url: '/productlist',
                views: {
                    'content@': {
                        templateUrl: 'views/productList.html',
                        controller: "productListController as productListCtrl"
                    }
                },
                secured: false
            })
            .state('root.versions', {
                url: '/versions',
                views: {
                    'content@': {
                        templateUrl: 'views/versions.html',
                        controller: "versionsController as versionsCtrl"
                    }
                },
                secured: false
            })

    }]);

});
