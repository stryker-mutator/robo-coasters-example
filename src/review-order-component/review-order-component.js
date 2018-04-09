{
    class ReviewOrderComponent {
        constructor(orderService, $location) {
            this.$location = $location;
            this.orderService = orderService;
            if (orderService.currentOrder) {
                this.order = orderService.currentOrder;
                this.numberOfDrinks = this.order.reduce((numberOfDrinks, drink) => numberOfDrinks + drink.amount, 0);
                this.minAge = this.order.reduce((minAge, drink) => Math.max(minAge, drink.minAge), 0);
            } else {
                $location.path('/');
            }
        }

        submit() {
            if (this.age > this.minAge) {
                this.orderService.submit();
            }
        }

        cancel() {
            this.orderService.clear();
            this.$location.path('/');
        }
    }

    ReviewOrderComponent.$inject = ['orderService', '$location'];
    app.component('roboReviewOrder', {
        controller: ReviewOrderComponent,
        templateUrl: '/src/review-order-component/review-order-component.html',
        controllerAs: 'cpt'
    });
}