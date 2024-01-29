import { jest } from '@jest/globals';
import { PlaceOrderComponent } from '../../src/components/place-order.component.js';
import { router } from '../../src/router.js';
import { RideService, rideService } from '../../src/services/ride.service.js';
import { orderService } from '../../src/services/order.service.js';
import { createRide, createOrderItem } from '../helpers';

describe(PlaceOrderComponent.name, () => {
  /** @type {PlaceOrderComponent} */
  let sut;

  /** @type {import('jest-mock').SpyInstance<(route: string) => void>} */
  let routerNextStub;
  /** @type {import('jest-mock').SpyInstance<RideService['getRides']>} */
  let getRidesStub;
  /** @type {import('jest-mock').SpyInstance<(arg: TicketOrder[]) => void>} */
  let setOrderStub;

  beforeEach(() => {
    routerNextStub = jest.spyOn(router, 'next').mockImplementation(() => {
      // idle
    });
    getRidesStub = jest.spyOn(rideService, 'getRides');
    setOrderStub = jest.spyOn(orderService, 'currentOrder', 'set');
  });

  afterEach(() => {
    sut.remove();
  });

  it('should navigate to next page on submit', async () => {
    // Arrange
    const rides = [createRide({ name: 'Big Coaster', price: 4.2 })];
    getRidesStub.mockResolvedValue(rides);
    createSut();
    await tick();
    sut.increment(sut.orders[0]);

    // Act
    sut.submit();

    // Assert
    expect(routerNextStub).toHaveBeenCalled();
  });

  it('should increment the ride amount on increment', () => {
    const orderItem = createOrderItem({ name: 'Big Coaster', amount: 0 });
    sut.increment(orderItem);
    expect(orderItem.amount).toEqual(1);
  });

  it('should decrement the ride amount on decrement', () => {
    const orderItem = createOrderItem({ name: 'Big Coaster', amount: 3 });
    sut.decrement(orderItem);
    expect(orderItem.amount).toBe(2);
  });

  it('should not go below 0 on decrement', () => {
    const orderItem = createOrderItem({ name: 'Big Coaster', amount: 0 });
    sut.decrement(orderItem);
    expect(orderItem.amount).toEqual(0);
  });

  function createSut() {
    sut = /** @type {PlaceOrderComponent} */ (
      document.createElement('robo-place-order')
    );
    return document.body.appendChild(sut);
  }

  function tick(n = 0) {
    return new Promise((res) => setTimeout(res, n));
  }
});
