import { jest } from '@jest/globals';
import { RobocoastersComponent } from '../../src/components/robocoasters.component.js';

import { router } from '../../src/router.js';

describe(RobocoastersComponent.name, () => {
  /** @type {RobocoastersComponent} */
  let sut;

  /** @type {import('jest-mock').SpyInstance<(callback: RouteCallback) => () => void>} */
  let routerOnNextStub;

  /** @type {import('jest-mock').SpyInstance<() => void>} */
  let routerUnsubscribeStub;

  beforeEach(() => {
    routerUnsubscribeStub = jest.fn();
    routerOnNextStub = jest
      .spyOn(router, 'onNext')
      .mockImplementation(() => /** @type {any} */ (routerUnsubscribeStub));
    sut = /** @type {RobocoastersComponent} */ (
      document.createElement('robo-coasters')
    );
    document.body.appendChild(sut);
  });

  afterEach(() => {
    sut.remove();
  });

  it('should display <robo-place-order> by default', () => {
    routerOnNextStub.mock.lastCall[0]('/something');
    expect(sut.querySelector('robo-place-order')).toBeTruthy();
  });
  it('should display <robo-review-order> when navigated to "/review"', () => {
    routerOnNextStub.mock.lastCall[0]('/review');
    expect(sut.querySelector('robo-review-order')).toBeTruthy();
  });
  it('should display <robo-success> when navigated to "/success"', () => {
    routerOnNextStub.mock.lastCall[0]('/success');
    expect(sut.querySelector('robo-success')).toBeTruthy();
  });
});
