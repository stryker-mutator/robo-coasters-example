(() => {
    app.config(($routeProvider) => {
        $routeProvider
            .when('/', {
                template: '<robo-place-order></robo-place-order>'
            })
            .when('/review', {
                template: '<robo-review-order></robo-review-order>'
            })
            .when('/success', {
                template: '<robo-success></robo-success>'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
})();