import { ridesSummary } from '../../src/pipes/rides-summary.pipe.js';
import { createPerson, createRide, createRideOrder } from '../helpers.js';

describe(ridesSummary.name, () => {
  it('should provide "person" postfix for 1', () => {
    expect(
      ridesSummary(createRideOrder({ people: [createPerson()] })),
    ).toContain('1 person');
  });
  it('should provide "people" postfix for 2', () => {
    const actualSummary = ridesSummary(
      createRideOrder({
        people: [
          createPerson({ height: 20 }),
          createPerson({ height: 30 }),
          createPerson({ height: 20 }),
        ],
        ride: createRide({ minHeight: 10 }),
      }),
    );
    expect(actualSummary).toContain('3 people');
  });
});
