import nextElementInList from '../../../src/utils/nextElementInList.js';

describe('nextElementInList', () => {
  it('should locate elements in a list and returns the next element in that list', () => {
    const list = ['A', 'B', 'C', 'D', 'E'];
    const value = 'C';
    const result = nextElementInList(list, value);
    expect(result).toBe('D');
  });

  it('should should loop through the last element and give back the first one', () => {
    const list = ['A', 'B', 'C', 'D', 'E'];
    const value = 'E';
    const result = nextElementInList(list, value);
    expect(result).toBe('A');
  });
});
