export class OrderService {
  /** @type {RideOrder | undefined} */
  #currentOrder;

  /**
   * @param {Storage} localStorage
   */
  constructor(localStorage) {
    this.localStorage = localStorage;
  }

  /**
   * @type {RideOrder}
   */
  get currentOrder() {
    if (!this.#currentOrder && this.localStorage.getItem('currentOrder')) {
      this.#currentOrder = JSON.parse(
        this.localStorage.getItem('currentOrder'),
      );
    }
    return this.#currentOrder;
  }
  /**
   * @param {RideOrder} value
   */
  set currentOrder(value) {
    this.#currentOrder = value;
    this.localStorage.setItem('currentOrder', JSON.stringify(value));
  }

  clear() {
    this.currentOrder = undefined;
  }
}

export const orderService = new OrderService(localStorage);
