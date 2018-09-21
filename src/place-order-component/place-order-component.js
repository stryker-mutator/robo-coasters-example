(() => {
    class PlaceOrderComponent {

        constructor(orderService, drinkService, $location) {
            this.drinks = drinkService.getDrinks();
            this.orderService = orderService;
            this.$location = $location;
        }

        increment(drink) {
            drink.amount++;
        }
        decrement(drink) {
            drink.amount--;
            if (drink.amount < 0) {
                drink.amount = 0;
            }
        }

        totalPrice() {
            return this.drinks.reduce((total, drink) => total + drink.amount * drink.price, 0);
        }

        submitEnabled() {
            return this.drinks.some(drink => drink.amount > 0);
        }

        submit() {
            this.orderService.currentOrder = this.drinks.filter(drink => drink.amount);
            this.$location.path('/review'); 
        }
    }

    PlaceOrderComponent.$inject = ['orderService', 'drinkService', '$location'];

    app.component('roboPlaceOrder', {
        templateUrl: '/src/place-order-component/place-order-component.html',
        controller: PlaceOrderComponent,
        controllerAs: 'cpt'
    });
})();