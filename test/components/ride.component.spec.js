import { jest } from '@jest/globals';
import { router } from '../../src/router.js';
import { createRide } from '../helpers.js';
import { RideComponent } from '../../src/components/ride.component.js';
import { rideService } from '../../src/services/ride.service.js';

describe(RideComponent.name, () => {
  /** @type {Ride} */
  let ride;
  /** @type {RideComponent} */
  let sut;

  /** @type {import('jest-mock').SpyInstance<(route: string[]) => void>} */
  let routerNavigateStub;

  beforeEach(() => {
    ride = createRide();
    routerNavigateStub = jest
      .spyOn(router, 'navigate')
      .mockImplementation(() => {
        // idle
      });
    jest.spyOn(rideService, 'getRide').mockReturnValue(Promise.resolve(ride));
  });
  afterEach(() => {
    sut.remove();
  });

  it('should navigate back on cancel', async () => {
    await createSut();
    sut.cancel();
    expect(routerNavigateStub).toHaveBeenCalled();
  });
  it('should navigate back when ride cannot be found', async () => {
    jest.spyOn(rideService, 'getRide').mockResolvedValue(undefined);
    await createSut();
    expect(routerNavigateStub).toHaveBeenCalled();
  });

  describe('change people dropdown', () => {
    it('should render correct number of height inputs', async () => {
      ride.minHeight = 120;
      await createSut();
      /** @type {HTMLInputElement} */ (sut.by.id.peopleSelect).value = '3';
      sut.by.id.peopleSelect.dispatchEvent(new Event('input'));
      expect(sut.by.id.heightInputs.querySelectorAll('input')).toHaveLength(3);
    });
  });
  describe('submit', () => {
    it('should allow if height check is disabled', async () => {
      ride.minHeight = undefined;
      await createSut();
      sut.submit(new Event('submit'));
      expect(routerNavigateStub).toHaveBeenCalled();
    });

    it('should allow if person has correct height', async () => {
      ride.minHeight = 120;
      await createSut();
      /** @type {HTMLInputElement} */ (
        sut.querySelector('#height-inputs input')
      ).valueAsNumber = 140;
      sut.submit(new Event('submit'));
      expect(routerNavigateStub).toHaveBeenCalled();
    });

    it('should not allow person does not have the correct height', async () => {
      ride.minHeight = 140;
      await createSut();
      /** @type {HTMLInputElement} */ (
        sut.querySelector('#height-inputs input')
      ).valueAsNumber = 120;
      sut.submit(new Event('submit'));
      expect(routerNavigateStub).not.toHaveBeenCalled();
    });
  });

  async function createSut() {
    sut = /** @type {RideComponent} */ (document.createElement('robo-ride'));
    document.body.appendChild(sut);
    await nextTick();
  }
});

async function nextTick() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}
