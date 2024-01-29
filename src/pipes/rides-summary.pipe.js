/**
 * @param {TicketOrder[] | undefined} orders
 * @return {string}
 */
export function ridesSummary(orders) {
  const total = orders?.reduce(
    (numberOfRides, order) => numberOfRides + order.amount,
    0
  );
  return `${total} ride${total === 1 ? '' : 's'}`;
}
