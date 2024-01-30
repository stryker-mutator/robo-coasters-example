/**
 * @param {Partial<Ride>} [overrides]
 * @returns {Ride}
 */
export function createRide(overrides) {
  return {
    id: 'robo-train',
    name: 'Robo Choo Choo Train',
    description: 'A train ride for robots',
    image: 'https://via.placeholder.com/300x150',
    ...overrides,
  };
}

/**
 * @param {Partial<RideOrder>} [overrides]
 * @returns {RideOrder}
 */
export function createRideOrder(overrides) {
  return {
    people: [createPerson()],
    ride: createRide(),
    ...overrides,
  };
}

/**
 * @param {Partial<Person>} [overrides]
 * @returns {Person}
 */
export function createPerson(overrides) {
  return {
    index: 1,
    height: 20,
    ...overrides,
  };
}
