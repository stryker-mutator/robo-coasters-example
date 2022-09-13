import { jest } from '@jest/globals';
import { PlaceOrderComponent } from '../../src/components/place-order.component.js';
import { router } from '../../src/router.js';
import { DrinkService, drinkService } from '../../src/services/drink.service';
import { orderService } from '../../src/services/order.service.js';
import { createDrink, createOrderItem } from '../helpers';

describe(PlaceOrderComponent.name, () => {
  /** @type {PlaceOrderComponent} */
  let sut;

  /** @type {import('jest-mock').SpyInstance<(route: string) => void>} */
  let routerNextStub;
  /** @type {import('jest-mock').SpyInstance<DrinkService['getDrinks']>} */
  let getDrinksStub;
  /** @type {import('jest-mock').SpyInstance<(arg: OrderItem[]) => void>} */
  let setOrderStub;

  beforeEach(() => {
    routerNextStub = jest.spyOn(router, 'next').mockImplementation(() => {
      // idle
    });
    getDrinksStub = jest.spyOn(drinkService, 'getDrinks');
    setOrderStub = jest.spyOn(orderService, 'currentOrder', 'set');
  });

  afterEach(() => {
    sut.remove();
  });

  it('should retrieve and render the drinks to order', async () => {
    // Arrange
    const drinks = [
      createDrink({ name: 'Beer', price: 4.2 }),
      createDrink({ name: 'Wine', price: 5 }),
    ];
    getDrinksStub.mockResolvedValue(drinks);

    // Act
    createSut();
    await tick();

    // Assert
    /** @type {HTMLTableSectionElement} */
    const tableBody = sut.querySelector('tbody');
    expect(tableBody.rows).toHaveLength(2);
  });

  describe('with 3 drinks', () => {
    /** @type {HTMLTableSectionElement} */
    let tableBody;
    /** @type {Drink[]} */
    let drinks;
    beforeEach(async () => {
      drinks = [
        createDrink({ name: 'Beer', price: 4.2 }),
        createDrink({ name: 'Wine', price: 5 }),
        createDrink({ name: 'Cola', price: 4 }),
      ];
      getDrinksStub.mockResolvedValue(drinks);
      createSut();
      await tick();
      tableBody = sut.querySelector('tbody');
    });

    it('should increment the drink amount on increment', () => {
      const roboBeer = createOrderItem({ name: 'Beer', amount: 0 });
      sut.increment(roboBeer);
      expect(roboBeer.amount).toEqual(1);
    });

    it('should go below 0 on decrement', () => {
      const roboBeer = createOrderItem({ name: 'Robo Beer', amount: 0 });
      sut.decrement(roboBeer);
      expect(roboBeer.amount).toEqual(0);
    });

    it('should bind increment button', () => {
      /** @type {HTMLButtonElement} */
      const incrementButton = tableBody.querySelector(
        'tr:nth-child(1) .roboIncrement'
      );
      incrementButton.click();
      expect(sut.orderItems[0].amount).toBe(1);
    });
    it('should bind decrement button', () => {
      const orderItem = sut.orderItems[0];
      orderItem.amount = 3;
      /** @type {HTMLButtonElement} */
      const decrementButton = tableBody.querySelector(
        'tr:nth-child(1) .roboDecrement'
      );
      decrementButton.click();
      expect(orderItem.amount).toBe(2);
    });

    it('should navigate to next page on submit', () => {
      // Arrange
      /** @type {HTMLButtonElement} */
      const incrementButton = tableBody.querySelector(
        'tr:nth-child(1) .roboIncrement'
      );
      incrementButton.click();
      /** @type {HTMLButtonElement} */
      const btnSubmit = sut.querySelector('.roboSubmit');

      // Act
      btnSubmit.click();

      // Assert
      expect(routerNextStub).toHaveBeenCalled();
    });
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
