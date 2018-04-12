describe('SuccessComponent', () => {

    beforeEach(module('robobar'));

    let sut, orderServiceMock;

    beforeEach(inject(($componentController) => {
        orderServiceMock = { currentOrder: [{}] };
        sut = $componentController('roboSuccess', {
            orderService: orderServiceMock
        });
    }));

    it('should be constructed', () => {
        expect(sut).toBeTruthy();
    });
});