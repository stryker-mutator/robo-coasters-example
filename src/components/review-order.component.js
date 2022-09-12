import { currency } from '../pipes/currency.pipe.js';
import { drinks } from '../pipes/drinks.pipe.js';
import {
  reviewOrderTemplate,
  reviewRowTemplate,
} from './review-order.template.js';
import { router } from '../router.js';
import { orderService } from '../services/order.service.js';

export class ReviewOrderComponent extends HTMLElement {
  #age = 0;
  #order;
  /** @type {string | undefined}  */
  error;

  /** @type {HTMLDivElement} */
  #alertEl;
  /** @type {HTMLParagraphElement} */
  #alertTextEl;
  /** @type {HTMLDivElement} */
  #ageCheckEl;
  /** @type {HTMLInputElement} */
  #ageCheckInputEl;
  /** @type {HTMLSpanElement} */
  #totalAmountEl;
  /** @type {HTMLButtonElement} */
  #submitButton;
  /** @type {HTMLFormElement} */
  #submitForm;
  /** @type {HTMLElement} */
  #reviewTableBodyEl;

  get age() {
    return this.#age;
  }
  set age(val) {
    this.#age = val;
    this.#render();
  }

  constructor() {
    super();
    this.#order = orderService.currentOrder;
  }

  /** @param {SubmitEvent} event */
  submit(event) {
    event.preventDefault();
    if (!this.ageCheck || this.isAllowedToBuyAlcohol({ age: this.age })) {
      this.error = undefined;
      router.next('/success');
    } else {
      this.error = 'Only adults can buy alcohol!';
      this.#render();
    }
  }

  cancel() {
    orderService.clear();
    router.next('/');
  }

  /** @param {{ age: number; }} customer */
  isAllowedToBuyAlcohol(customer) {
    return customer.age > 18;
  }

  get ageCheck() {
    return this.#order.some((drink) => drink.isAlcoholic);
  }

  get numberOfDrinks() {
    return this.#order.reduce(
      (numberOfDrinks, drink) => numberOfDrinks + drink.amount,
      0
    );
  }

  connectedCallback() {
    if (orderService.currentOrder.length) {
      this.appendChild(reviewOrderTemplate.content.cloneNode(true));
      this.#alertEl = this.querySelector('.robo-alert');
      this.#alertTextEl = this.querySelector('.robo-alert-text');
      this.#ageCheckEl = this.querySelector('.robo-age-check');
      this.#ageCheckInputEl = this.querySelector('#ageInput');
      this.#ageCheckInputEl.addEventListener('input', () => {
        this.age = this.#ageCheckInputEl.valueAsNumber;
      });
      /** @type {HTMLSpanElement} */
      this.#totalAmountEl = this.querySelector('.robo-total-amount');
      this.#submitButton = this.querySelector('.robo-submit');
      this.#submitForm = this.querySelector('.robo-submit-form');
      this.#submitForm.addEventListener('submit', (ev) => this.submit(ev));
      this.querySelector('.robo-cancel').addEventListener('click', () =>
        this.cancel()
      );
      this.#reviewTableBodyEl = this.querySelector('.robo-review-table tbody');
      this.#render();
    } else {
      router.next('/');
    }
  }

  #render() {
    this.#totalAmountEl.innerText = drinks(this.numberOfDrinks);
    this.#alertEl.hidden = !this.error;
    this.#alertTextEl.innerText = this.error;
    this.#ageCheckEl.hidden = !this.ageCheck;
    this.#submitButton.disabled = this.ageCheck && !this.age;
    this.#renderReviewTableBody();
  }

  #renderReviewTableBody() {
    while (this.#reviewTableBodyEl.firstChild) {
      this.#reviewTableBodyEl.removeChild(this.#reviewTableBodyEl.firstChild);
    }
    this.#order.forEach((orderItem) => {
      const row = /** @type {HTMLTableRowElement} */ (
        reviewRowTemplate.content.cloneNode(true)
      );

      /** @param {string} selector @param {string} text */
      const setText = (selector, text) => {
        /** @type {HTMLElement} */
        const el = row.querySelector(selector);
        el.innerText = text;
      };

      setText('.robo-name', orderItem.name);
      setText('.robo-amount', orderItem.amount.toString());
      setText('.robo-price-per-drink', currency(orderItem.price));
      setText('.robo-price', currency(orderItem.price * orderItem.amount));
      this.#reviewTableBodyEl.appendChild(row);
    });
  }
}

customElements.define('robo-review-order', ReviewOrderComponent);
