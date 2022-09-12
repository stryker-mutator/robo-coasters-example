import { drinks } from '../../src/pipes/drinks.pipe.js';

describe(drinks.name, () => {
  it('should provide "drink" postfix for 1', () => {
    expect(drinks(1)).toBe('1 drink');
  });
  it('should provide "drinks" postfix for 2', () => {
    expect(drinks(2)).toBe('2 drinks');
  });
});
