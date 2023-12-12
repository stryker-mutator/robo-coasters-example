import { orderService } from '../services/order.service.js';
import { rideService } from '../services/ride.service.js';
import { router } from '../router.js';
import {
  templatePlaceOrder,
  templateOrderRow,
} from './place-order.template.js';
import { currency } from '../pipes/currency.pipe.js';
import { cloneTemplate, RoboComponent, Selector } from './robo.component.js';

export class PlaceOrderComponent extends RoboComponent {
  /** @type {TicketOrder[]} */
  orders = [];

  /** @param {TicketOrder} orderItem */
  increment(orderItem) {
    orderItem.amount++;
    this.#render();
  }
  /** @param {TicketOrder} orderItem */
  decrement(orderItem) {
    orderItem.amount--;
    if (orderItem.amount < 0) {
      orderItem.amount = 0;
    }
    this.#render();
  }

  get totalPrice() {
    return this.orders.reduce(
      (total, ticket) => total + ticket.amount * ticket.price,
      0
    );
  }

  get submitEnabled() {
    return this.orders.some((order) => order.amount > 0);
  }

  submit() {
    orderService.currentOrder = this.orders.filter((order) => order.amount);
    router.next('/review');
  }

  connectedCallback() {
    this.appendChild(cloneTemplate(templatePlaceOrder));
    rideService.getRides().then((rides) => {
      this.orders = rides.map((ride) => ({ ...ride, amount: 0 }));
      this.#render();
    });
    this.by.class.roboSubmit.addEventListener('click', this.submit.bind(this));
    this.#render();
  }

  #render() {
    this.by.class.roboOrderTableBody.replaceChildren(
      ...this.orders.map((orderItem) => this.#renderOrderRow(orderItem))
    );
    this.by.class.roboTotalPrice.innerText = currency(this.totalPrice);
    /** @type {HTMLInputElement} */ (this.by.class.roboSubmit).disabled =
      !this.submitEnabled;
  }

  /**
   * @param {TicketOrder} orderItem
   */
  #renderOrderRow(orderItem) {
    const row = cloneTemplate(templateOrderRow);
    const selector = new Selector(row);
    selector.class.roboName.innerText = orderItem.name;
    selector.class.roboPrice.innerText = currency(orderItem.price);
    /** @type {HTMLInputElement}*/ (selector.class.roboAmount).value =
      orderItem.amount.toString();
    selector.class.roboIncrement.addEventListener(
      'click',
      this.increment.bind(this, orderItem)
    );
    selector.class.roboDecrement.addEventListener(
      'click',
      this.decrement.bind(this, orderItem)
    );
    return row;
  }
}

customElements.define('robo-place-order', PlaceOrderComponent);
