import { describe, it, expect } from 'vitest';

import { evenOrOdd } from '@/playground';

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
});
