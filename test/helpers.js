/**
 * @param {Partial<Ride>} [overrides]
 * @returns {Ride}
 */
export function createRide(overrides) {
  return {
    mustBeAdult: false,
    name: 'Robo Choo Choo Train',
    price: 5,
    ...overrides,
  };
}

/**
 * @param {Partial<TicketOrder>} [overrides]
 * @returns {TicketOrder}
 */
export function createOrderItem(overrides) {
  return {
    mustBeAdult: false,
    name: 'Robo Choo Choo Train',
    price: 5,
    amount: 1,
    ...overrides,
  };
}
