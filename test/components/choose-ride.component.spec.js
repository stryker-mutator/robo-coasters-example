import { jest } from '@jest/globals';

import { router } from '../../src/router.js';
import { RideService, rideService } from '../../src/services/ride.service.js';
import { createRide } from '../helpers.js';
import { ChooseRideComponent } from '../../src/components/choose-ride.component.js';

describe(ChooseRideComponent.name, () => {
  /** @type {ChooseRideComponent} */
  let sut;

  /** @type {import('jest-mock').SpyInstance<(route: string[]) => void>} */
  let navigateStub;
  /** @type {import('jest-mock').SpyInstance<RideService['getRides']>} */
  let getRidesStub;

  beforeEach(() => {
    navigateStub = jest.spyOn(router, 'navigate').mockImplementation(() => {
      // idle
    });
    getRidesStub = jest.spyOn(rideService, 'getRides');
  });

  afterEach(() => {
    sut.remove();
  });

  it('should navigate to ride page when chosen a ride', async () => {
    // Arrange
    const rides = [
      createRide({ id: 'big-coaster', name: 'Big Coaster', minHeight: 180 }),
    ];
    getRidesStub.mockResolvedValue(rides);
    createSut();
    await tick();

    // Act
    sut.querySelector('.btn-primary').dispatchEvent(new Event('click'));

    // Assert
    expect(navigateStub).toHaveBeenCalled();
  });

  function createSut() {
    sut = /** @type {ChooseRideComponent} */ (
      document.createElement('robo-choose-ride')
    );
    return document.body.appendChild(sut);
  }

  function tick(n = 0) {
    return new Promise((res) => setTimeout(res, n));
  }
});
