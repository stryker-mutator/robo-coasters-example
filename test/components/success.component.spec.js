import { jest } from '@jest/globals';
import { SuccessComponent } from '../../src/components/success.component.js';
import { orderService } from '../../src/services/order.service.js';
import { createOrderItem } from '../helpers';

describe(SuccessComponent.name, () => {
  /** @type {OrderItem[]} */
  let order;
  /** @type {HTMLElement} */
  let sut;

  beforeEach(() => {
    order = [];
    jest.spyOn(orderService, 'currentOrder', 'get').mockReturnValue(order);
  });

  afterEach(() => {
    sut.remove();
  });

  it('should show the number of drinks', () => {
    order.push(createOrderItem({ amount: 0 }));
    createSut();
    /** @type {HTMLElement}  */
    const headerEl = sut.querySelector('.robo-drinks');
    expect(headerEl.innerText).toEqual('0 drinks');
  });

  function createSut() {
    sut = document.createElement('robo-success');
    return document.body.appendChild(sut);
  }
});
