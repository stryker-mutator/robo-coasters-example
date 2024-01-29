import { ridesSummary } from '../../src/pipes/rides-summary.pipe.js';
import { createOrderItem } from '../helpers.js';

describe(ridesSummary.name, () => {
  it('should provide "ride" postfix for 1', () => {
    expect(ridesSummary([createOrderItem({ amount: 1 })])).toContain('1 ride');
  });
  it('should provide "rides" postfix for 0', () => {
    expect(ridesSummary([createOrderItem({ amount: 0 })])).toContain('0 rides');
  });
});
