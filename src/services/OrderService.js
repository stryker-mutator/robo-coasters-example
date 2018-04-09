{

    class OrderService {

        get currentOrder() {
            return this._currentOrder;
        }

        set currentOrder(value) {
            this._currentOrder = value;
        }

        clear() {
            this.currentOrder = undefined;
        }
    }

    app.service('orderService', OrderService);
}