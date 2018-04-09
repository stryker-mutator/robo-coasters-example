{
    app.config(($routeProvider) => {
        $routeProvider
            .when('/', {
                template: '<robo-place-order></robo-place-order>'
            })
            .when('/review', {
                template: '<robo-review-order></robo-review-order>'
            })
            .when('/thanks', {
                template: '<robo-order-placed></robo-order-placed>'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
}