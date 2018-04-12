(() => {
    class OrderService {

        constructor(localStorage) {
            this.localStorage = localStorage;
        }

        get currentOrder() {
            if (!this._currentOrder && this.localStorage['currentOrder']) {
                this._currentOrder = JSON.parse(this.localStorage['currentOrder'])
            }
            return this._currentOrder;
        }

        set currentOrder(value) {
            this._currentOrder = value;
            this.localStorage['currentOrder'] = JSON.stringify(value);
        }

        clear() {
            this.currentOrder = null;
        }
    }

    OrderService.$inject = ['localStorage'];

    app.service('orderService', OrderService);
})();