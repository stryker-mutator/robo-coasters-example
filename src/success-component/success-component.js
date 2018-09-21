(() => {

    class SuccessComponent {

        constructor(orderService) {
            this.numberOfDrinks = orderService.currentOrder.reduce((numberOfDrinks, drink) => numberOfDrinks + drink.amount, 0)
        }
    }

    SuccessComponent.$inject = ['orderService'];

    app.component('roboSuccess', {
        templateUrl: '/src/success-component/success-component.html',
        controller: SuccessComponent,
        controllerAs: 'cpt'
    });
})();