
describe('OrderService', () => {

    beforeEach(module('robobar'));

    let sut;

    beforeEach(inject(orderService => {
        sut = orderService;
        sut.clear();
    }));

    describe('currentOrder', () => {
        it('should retrieve given order', () => {
            sut.currentOrder = 'foobar';
            expect(sut.currentOrder).toBe('foobar');
        });

        it('should retrieve from localStorage if local copy does not exist', () => {
            sut.currentOrder = 'foobar';
            sut._currentOrder = undefined;
            expect(sut.currentOrder).toBe('foobar');
        });
    });
});
