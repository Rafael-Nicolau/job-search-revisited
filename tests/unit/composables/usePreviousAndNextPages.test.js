import usePreviousAndNextPages from '../../../src/composables/usePreviousAndNextPages';

describe('usePreviousAndNextPages', () => {
  it('should calculate the page before the current one', () => {
    const currentPage = { value: 8 };
    const maxPage = { value: 10 };
    const { previousPage } = usePreviousAndNextPages(currentPage, maxPage);
    expect(previousPage.value).toBe(7);
  });

  describe('when the current page is the first page', () => {
    it('should not provide previous page', () => {
      const currentPage = { value: 1 };
      const maxPage = { value: 1 };
      const { previousPage } = usePreviousAndNextPages(currentPage, maxPage);
      expect(previousPage.value).toBeUndefined();
    });
  });

  it('should calculates the page after the current one', () => {
    const currentPage = { value: 8 };
    const maxPage = { value: 10 };
    const { nextPage } = usePreviousAndNextPages(currentPage, maxPage);
    expect(nextPage.value).toBe(9);
  });

  describe('when the current page is the last page', () => {
    it('should not provide next page', () => {
      const currentPage = { value: 8 };
      const maxPage = { value: 8 };
      const { nextPage } = usePreviousAndNextPages(currentPage, maxPage);
      expect(nextPage.value).toBeUndefined();
    });
  });
});
