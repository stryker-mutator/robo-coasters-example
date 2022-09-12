import { drinks } from '../pipes/drinks.pipe.js';
import { orderService } from '../services/order.service.js';

const template = document.createElement('template');
template.innerHTML = `<div class="row">
    <h2 class="robo-drinks col-12 display-4"></h2>
  </div>
  <div class="row">
    <div class="col-12">
      <p>Coming right up! ~bzzzt~</p>
      <form>
        <a href="#/" type="button" class="btn btn-primary">New order</a>
      </form>
    </div>
  </div>`;

export class SuccessComponent extends HTMLElement {
  /** @type {HTMLElement} */
  #drinksEl;

  get numberOfDrinks() {
    return orderService.currentOrder.reduce(
      (numberOfDrinks, drink) => numberOfDrinks + drink.amount,
      0
    );
  }

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
    this.#drinksEl = this.querySelector('.robo-drinks');
    this.#render();
  }

  #render() {
    this.#drinksEl.innerText = drinks(this.numberOfDrinks);
  }
}

customElements.define('robo-success', SuccessComponent);
