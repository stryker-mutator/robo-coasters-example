(() => {
    class ReviewOrderComponent {
        constructor(orderService, $location) {
            this.$location = $location;
            this.orderService = orderService;
            if (orderService.currentOrder) {
                this.order = orderService.currentOrder;
                this.numberOfDrinks = this.order.reduce((numberOfDrinks, drink) => numberOfDrinks + drink.amount, 0);
                this.ageCheck = this.order.some(drink => drink.isAlcoholic);
            } else {
                $location.path('/');
            }
        }

        submit() {
            if (!this.ageCheck || this.isAllowedToBuyAlcohol({ age: this.age })) {
                this.error = null;
                this.$location.path('/success');
            } else {
                this.error = 'Only adults can buy alcohol!';
            }
        }

        cancel() {
            this.orderService.clear();
            this.$location.path('/');
        }

        isAllowedToBuyAlcohol(customer) {
            return customer.age > 18;
        }
    }

    ReviewOrderComponent.$inject = ['orderService', '$location'];
    app.component('roboReviewOrder', {
        controller: ReviewOrderComponent,
        templateUrl: '/src/review-order-component/review-order-component.html',
        controllerAs: 'cpt'
    });
})();