import { evenOrOdd, multiply } from '@/playground';

describe('basic math', () => {
  it('should adds two numbers', () => {
    expect(1 + 1).toBe(2);
  });

  describe('evenOrOdd', () => {
    describe('when number is even', () => {
      it('should return that the number is even', () => {
        expect(evenOrOdd(2)).toBe('Even');
      });
    });

    describe('when number is odd', () => {
      it('should return that the number is odd', () => {
        expect(evenOrOdd(3)).toBe('Odd');
      });
    });
  });

  describe('multiply', () => {
    it('should multiply two numbers together', () => {
      expect(multiply(2, 3)).toBe(6);
    });
  });
});
