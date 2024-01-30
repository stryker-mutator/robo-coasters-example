import { ridesSummary } from '../pipes/rides-summary.pipe.js';
import { orderService } from '../services/order.service.js';
import { cloneTemplate, RoboComponent } from './robo.component.js';

const template = document.createElement('template');
template.innerHTML = `<div class="row">
    <p class="robo-rides col-12 display-6"></p>
  </div>
  <div class="row">
    <div class="col-6">
      <p>Go right ahead ~bzzzt~</p>
      <a href="#/" type="button" class="offset-4 btn btn-primary">New ride</a>
    </div>
    <div class="offset-1 col-4">
      <img id="ride-image" class="rounded img-fluid" alt="" />
    </div>
  </div>`;

export class SuccessComponent extends RoboComponent {
  connectedCallback() {
    this.appendChild(cloneTemplate(template));
    /** @type {HTMLImageElement} */ (this.by.id.rideImage).src =
      orderService.currentOrder.ride.image;
    this.by.class.roboRides.innerText = ridesSummary(orderService.currentOrder);
  }
}

customElements.define('robo-success', SuccessComponent);
