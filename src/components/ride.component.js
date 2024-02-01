import { router } from '../router.js';
import { orderService } from '../services/order.service.js';
import { rideService } from '../services/ride.service.js';
import {
  heightTemplate,
  minimalRideHeightTemplate,
  templateRidePage,
} from './ride.template.js';
import { RoboComponent, Selector, cloneTemplate } from './robo.component.js';

export class RideComponent extends RoboComponent {
  /** @type {Ride} */
  ride;

  #numPeople = 1;

  get numPeople() {
    return this.#numPeople;
  }
  set numPeople(value) {
    this.#numPeople = value;
    this.#render();
  }

  /** @param {Event} event */
  handleRideSelect = (event) => {
    this.numPeople = parseInt(
      /** @type {HTMLInputElement} */ (event.target).value,
    );
  };

  /** @return {Person[]} */
  getPeople() {
    /** @type {Person[]} */
    const people = [];

    const heightInputs = [...this.by.id.heightInputs.querySelectorAll('input')];
    for (let i = 0; i < this.numPeople; i++) {
      people.push({
        index: i + 1,
        height: heightInputs[i]?.valueAsNumber ?? 0,
      });
    }
    return people;
  }

  cancel = () => {
    router.navigate([]);
  };

  /** @param {Event} event */
  submit = (event) => {
    event.preventDefault();
    const people = this.getPeople();
    if (this.ride.minHeight) {
      const invalidHeights = people.filter(
        ({ height }) => !this.hasValidHeight(height),
      );
      if (invalidHeights.length) {
        this.by.id.alert.style.display = 'block';
        this.by.id.alertText.innerHTML = `${invalidHeights.map(({ index }) => `Person ${index} is too short for this ride`).join('<br />')}`;
        return;
      }
    }
    orderService.currentOrder = { ride: this.ride, people };
    router.navigate(['success']);
  };

  connectedCallback() {
    this.appendChild(cloneTemplate(templateRidePage));
    const rideId = this.getAttribute('ride-id');
    rideService.getRide(rideId).then((ride) => {
      if (!ride) {
        router.navigate([]);
      }
      this.ride = ride;
      this.#render();
    });
    this.by.id.peopleSelect.addEventListener('input', this.handleRideSelect);
    this.by.id.previousBtn.addEventListener('click', this.cancel);
    this.by.id.form.addEventListener('submit', this.submit);
    this.#render();
  }

  /** @param {number} height */
  hasValidHeight(height) {
    return this.ride.minHeight < height;
  }

  #render() {
    this.by.id.alert.style.display = 'none';
    if (this.ride) {
      this.by.id.title.innerText = this.ride.name;
      const img = /** @type {HTMLImageElement}*/ (this.by.id.rideImage);
      img.src = this.ride.image;
      img.alt = this.ride.name;

      if (this.ride.minHeight) {
        const p = cloneTemplate(minimalRideHeightTemplate);
        new Selector(p).class.minHeight.textContent =
          this.ride.minHeight.toString();
        this.by.id.heightInputs.replaceChildren(
          p,
          ...new Array(this.numPeople).fill('').map((_, index) => {
            const element = cloneTemplate(heightTemplate);
            const row = new Selector(element);
            const label = /** @type {HTMLLabelElement} */ (
              row.class.colFormLabel
            );
            label.innerText = `Height for person ${index + 1}`;
            label.htmlFor = `heightInput-${index}`;
            const input = /** @type {HTMLInputElement} */ (
              row.class.formControl
            );
            input.id = `heightInput-${index}`;
            return element;
          }),
        );
      }
    }
  }
}
customElements.define('robo-ride', RideComponent);
