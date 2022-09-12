import { jest } from '@jest/globals';
import { ReviewOrderComponent } from '../../src/components/review-order.component.js';
import { router } from '../../src/router';
import { orderService } from '../../src/services/order.service.js';
import { createOrderItem } from '../helpers.js';

describe(ReviewOrderComponent.name, () => {
  /** @type {OrderItem[]} */
  let order;
  /** @type {ReviewOrderComponent} */
  let sut;

  /** @type {import('jest-mock').SpyInstance<(route: string) => void>} */
  let routerNextStub;

  beforeEach(() => {
    order = [];
    routerNextStub = jest.spyOn(router, 'next').mockImplementation(() => {
      // idle
    });
    jest.spyOn(orderService, 'currentOrder', 'get').mockReturnValue(order);
  });
  afterEach(() => {
    sut.remove();
  });

  it('should navigate back when there is no order', () => {
    createSut();
    expect(routerNextStub).toBeCalled();
  });

  it('should navigate back on cancel', () => {
    order.push(createOrderItem());
    createSut();
    /** @type {HTMLButtonElement} */
    const cancelBtn = sut.querySelector('.robo-cancel');
    cancelBtn.click();
    expect(routerNextStub).toHaveBeenCalled();
  });

  describe('submit', () => {
    /** @type {OrderItem} */
    let orderItem;
    beforeEach(() => {
      orderItem = createOrderItem();
      order.push(orderItem);
    });

    it('should allow if ageCheck is disabled', () => {
      orderItem.isAlcoholic = false;
      createSut();
      submitForm();
      expect(routerNextStub).toBeCalled();
    });

    it('should allow if user is 24', () => {
      orderItem.isAlcoholic = true;
      createSut();
      sut.age = 24;
      submitForm();
      expect(routerNextStub).toHaveBeenCalled();
    });

    it('should not allow if user is 12', () => {
      orderItem.isAlcoholic = true;
      createSut();
      sut.age = 12;
      submitForm();
      expect(sut.error).toBeTruthy();
    });

    it('should enable the submit button when age input is given', () => {
      // Arrange
      orderItem.isAlcoholic = true;
      createSut();
      /** @type {HTMLInputElement} */
      const ageInput = sut.querySelector('#ageInput');
      const inputEvent = new InputEvent('input', { bubbles: true });
      ageInput.valueAsNumber = 3;
      /** @type {HTMLButtonElement} */
      const submitBtn = sut.querySelector('.robo-submit');

      // Act
      ageInput.dispatchEvent(inputEvent);

      // Assert
      expect(submitBtn.disabled).toBeFalsy();
    });
  });

  function createSut() {
    sut = /** @type {ReviewOrderComponent} */ (
      document.createElement('robo-review-order')
    );
    return document.body.appendChild(sut);
  }
  function submitForm() {
    /** @type {HTMLButtonElement} */
    const submitBtn = sut.querySelector('.robo-submit');
    submitBtn.click();
  }
});
