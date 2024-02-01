import { jest } from '@jest/globals';
import { RoboCoastersComponent } from '../../src/components/robo-coasters.component.js';

import { router } from '../../src/router.js';

describe(RoboCoastersComponent.name, () => {
  /** @type {RoboCoastersComponent} */
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
    sut = /** @type {RoboCoastersComponent} */ (
      document.createElement('robo-coasters')
    );
    document.body.appendChild(sut);
  });

  afterEach(() => {
    sut.remove();
  });

  it('should display <robo-choose-ride> by default', () => {
    routerOnNextStub.mock.lastCall[0](['something']);
    expect(sut.querySelector('robo-choose-ride')).toBeTruthy();
  });
  it('should display <robo-choose-ride> when navigating to the root', () => {
    routerOnNextStub.mock.lastCall[0](['']);
    expect(sut.querySelector('robo-choose-ride')).toBeTruthy();
  });
  it('should display <robo-ride> when navigated to "/ride/something"', () => {
    routerOnNextStub.mock.lastCall[0](['ride', 'something']);
    expect(sut.querySelector('robo-ride')).toBeTruthy();
  });
  it('should display <robo-success> when navigated to "/success"', () => {
    routerOnNextStub.mock.lastCall[0](['success']);
    expect(sut.querySelector('robo-success')).toBeTruthy();
  });
});
