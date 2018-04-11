describe('PlaceOrderComponent', function () {

  beforeEach(module('robobar'));
  it('should have 3 drinks', inject(function ($componentController) {
    var ctrl = $componentController('roboPlaceOrder');
    expect(ctrl.drinks.length).toBe(3);
  }));
});