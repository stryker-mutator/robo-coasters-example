import { jest } from '@jest/globals';
import { SuccessComponent } from '../../src/components/success.component.js';
import { orderService } from '../../src/services/order.service.js';
import { createRideOrder } from '../helpers.js';

describe(SuccessComponent.name, () => {
  /** @type {RideOrder} */
  let order;
  /** @type {HTMLElement} */
  let sut;

  beforeEach(() => {
    order = createRideOrder();
    jest.spyOn(orderService, 'currentOrder', 'get').mockReturnValue(order);
  });

  afterEach(() => {
    sut.remove();
  });

  it('should render', () => {
    sut = document.createElement('robo-success');
    document.body.appendChild(sut);
    expect(sut).toBeTruthy();
  });
});
