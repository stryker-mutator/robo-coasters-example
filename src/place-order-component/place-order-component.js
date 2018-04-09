{

    class PlaceOrderComponent {

        constructor(orderService, drinkService) {
            this.drinks = drinkService.getDrinks();
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

        submitEnabled(){
            return this.drinks.some(drink => drink.amount > 0);
        }
    }

    PlaceOrderComponent.$inject = ['orderService', 'drinkService'];

    app.component('roboPlaceOrder', {
        templateUrl: '/src/place-order-component/place-order-component.html',
        controller: PlaceOrderComponent,
        controllerAs: 'cpt'
    });
}