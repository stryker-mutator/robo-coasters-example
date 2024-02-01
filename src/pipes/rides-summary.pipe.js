/**
 * @param {RideOrder} order
 * @return {string}
 */
export function ridesSummary(order) {
  let shortDescription = '';
  let people = 'people';
  if (order.ride.minHeight) {
    shortDescription = ` (>= ${order.people.reduce((acc, person) => (acc.height < person.height ? acc : person)).height} cm)`;
  }
  if (order.people.length === 1) {
    people = 'person';
  }
  return `${order.people.length} ${people} ${shortDescription} for the ${order.ride.name}, have fun!`;
}
