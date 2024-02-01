import { router } from '../router.js';
import { cloneTemplate, RoboComponent } from './robo.component.js';

const template = document.createElement('template');
template.innerHTML = `
<div class="container">
    <div class="row">
        <h1 class="col-12 display-2">Robo Coasters
        </h1>
    </div>
    <div id="view"><robo-choose-ride></robo-choose-ride></div>
    <div class="alert alert-default" role="alert">
        <h4 class="alert-heading">Prrt!</h4>
        Curious about the <a target="_blank" href="reports/coverage/lcov-report/index.html">code coverage report</a> or the <a target="_blank" href="reports/mutation/mutation.html">mutation testing report</a>? 
    </div>
</div>
`;
export class RoboCoastersComponent extends RoboComponent {
  /** @type {string | undefined} */
  currentlyViewedRoute;

  connectedCallback() {
    this.appendChild(cloneTemplate(template));
    this.view = this.by.id.view;
    this.routerSubscription = router.onNext((route) => {
      this.route = route;
      this.render();
    });
  }

  disconnectedCallback() {
    this.routerSubscription();
  }

  render() {
    switch (this.route[0]) {
      case 'ride':
        this.view.innerHTML = `<robo-ride ride-id="${this.route[1]}"></robo-ride>`;
        break;
      case 'success':
        this.view.innerHTML = `<robo-success></robo-success>`;
        break;
      case '':
        this.view.innerHTML = `<robo-choose-ride></robo-choose-ride>`;
      default:
        router.navigate([]);
        break;
    }
  }
}

customElements.define('robo-coasters', RoboCoastersComponent);
