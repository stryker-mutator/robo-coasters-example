import { orderService } from '../services/order.service.js';
import { drinkService } from '../services/drink.service.js';
import { router } from '../router.js';
import {
  templatePlaceOrder,
  templateOrderRow,
} from './place-order.template.js';
import { currency } from '../pipes/currency.pipe.js';

export class PlaceOrderComponent extends HTMLElement {
  /** @type {OrderItem[]} */
  orderItems = [];

  /** @param {OrderItem} orderItem */
  increment(orderItem) {
    orderItem.amount++;
    this.#render();
  }
  /** @param {OrderItem} orderItem */
  decrement(orderItem) {
    orderItem.amount--;
    if (orderItem.amount < 0) {
      orderItem.amount = 0;
    }
    this.#render();
  }

  get totalPrice() {
    return this.orderItems.reduce(
      (total, drink) => total + drink.amount * drink.price,
      0
    );
  }

  get submitEnabled() {
    return this.orderItems.some((drink) => drink.amount > 0);
  }

  submit() {
    orderService.currentOrder = this.orderItems.filter((drink) => drink.amount);
    router.next('/review');
  }

  connectedCallback() {
    this.appendChild(templatePlaceOrder.content.cloneNode(true));
    drinkService.getDrinks().then((drinks) => {
      this.orderItems = drinks.map((drink) => ({ ...drink, amount: 0 }));
      this.#render();
    });
    /** @type {HTMLTableSectionElement} */
    this.orderTableBody = this.querySelector('.robo-order-table tbody');
    /** @type {HTMLButtonElement} */
    this.btnSubmit = this.querySelector('.robo-submit');
    this.btnSubmit.addEventListener('click', () => this.submit());
    /** @type {HTMLTableElement} */
    this.totalPriceElement = this.querySelector('.robo-total-price');

    this.#render();
  }

  #render() {
    while (this.orderTableBody.firstChild) {
      this.orderTableBody.removeChild(this.orderTableBody.firstChild);
    }
    this.orderItems.forEach((orderItem) => this.#renderOrderRow(orderItem));
    this.totalPriceElement.innerText = currency(this.totalPrice);
    this.btnSubmit.disabled = !this.submitEnabled;
  }

  /**
   * @param {OrderItem} orderItem
   */
  #renderOrderRow(orderItem) {
    /** @type {HTMLTableRowElement} */
    const row = /** @type {any} */ (templateOrderRow.content.cloneNode(true));
    /** @type {HTMLTableCellElement} */
    const nameEl = row.querySelector('.robo-name');
    /** @type {HTMLTableCellElement} */
    const priceEl = row.querySelector('.robo-price');
    nameEl.innerText = orderItem.name;
    priceEl.innerText = currency(orderItem.price);
    /** @type {HTMLInputElement} */
    const amountInput = row.querySelector('.robo-amount');
    amountInput.value = orderItem.amount.toString();
    row
      .querySelector('.robo-increment')
      .addEventListener('click', () => this.increment(orderItem));
    row
      .querySelector('.robo-decrement')
      .addEventListener('click', () => this.decrement(orderItem));
    this.orderTableBody.appendChild(row);
  }
}

customElements.define('robo-place-order', PlaceOrderComponent);
