describe('PlaceOrderComponent', function() {

    beforeEach(module('robobar'));
  
    describe('PlaceOrderComponent', function() {
  
      it('should create a `phones` model with 3 phones', inject(function($componentController) {
        var ctrl = $componentController('roboPlaceOrder');
        expect(ctrl.drinks.length).toBe(3);
      }));
  
    });
  
  });