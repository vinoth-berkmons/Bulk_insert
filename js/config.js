
function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/index/bulkinsert");


    $stateProvider
        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/bulkinsert/common/content.html"
        })


}
angular
    .module('myApp')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
