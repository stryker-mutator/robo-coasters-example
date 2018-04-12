describe('PlaceOrderComponent', () => {

    beforeEach(module('robobar'));

    let sut, locationMock, orderServiceMock, $componentController;

    beforeEach(inject((_$componentController_) => {
        locationMock = jasmine.createSpyObj('$location', ['path']);
        orderServiceMock = { currentOrder: [], clear: jasmine.createSpy() };
        $componentController = _$componentController_;
    }));

    describe('on constructor', () => {

        it('should set order, numberOfDrinks and ageCheck properties', () => {
            orderServiceMock.currentOrder.push({ name: 'Robo Beer', price: 2, amount: 2 });
            orderServiceMock.currentOrder.push({ name: 'Robo(w)ine', price: 3, amount: 1 });
            sut = $componentController('roboReviewOrder', {
                $location: locationMock,
                orderService: orderServiceMock
            });
            expect(sut.order).toBe(orderServiceMock.currentOrder);
        });

        it('should navigate back if there is no order', () => {
            orderServiceMock.currentOrder = null;
            $componentController('roboReviewOrder', {
                $location: locationMock,
                orderService: orderServiceMock
            });
            expect(locationMock.path).toHaveBeenCalled();
        });
    });

    describe('submit', () => {
        beforeEach(() => {
            sut = $componentController('roboReviewOrder', {
                $location: locationMock,
                orderService: orderServiceMock
            });
        });

        it('should allow if ageCheck is disabled', () => {
            sut.ageCheck = false;
            sut.submit();
            expect(locationMock.path).toHaveBeenCalled();
        });
        
        it('should allow if user is 24', () => {
            sut.ageCheck = true;
            sut.age = 24;
            sut.submit();
            expect(locationMock.path).toHaveBeenCalled();
        });

        it('should not allow if user is 12', () => {
            sut.ageCheck = true;
            sut.age = 12;
            sut.submit();
            expect(sut.error).toBeTruthy();
        });
    });

    describe('cancel', () => {
        beforeEach(() => {
            sut = $componentController('roboReviewOrder', {
                $location: locationMock,
                orderService: orderServiceMock
            });
        });

        it('should navigate back', () => {
            sut.cancel();
            expect(locationMock.path).toHaveBeenCalled();
        });
    });
});