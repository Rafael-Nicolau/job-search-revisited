import { render, screen } from '@testing-library/vue';
import { nextTick } from 'vue';

import TheHeadline from '@/components/JobSearch/TheHeadline.vue';

describe('TheHeadline', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('should display introductory action verb', () => {
    render(TheHeadline);

    const actionPhrase = screen.getByRole('heading', {
      name: /build for everyone/i,
    });
    expect(actionPhrase).toBeInTheDocument();
  });

  it('should change action verb at a consistent interval', () => {
    const mock = vi.fn();
    vi.stubGlobal('setInterval', mock);

    render(TheHeadline);

    expect(mock).toHaveBeenCalled();
  });

  it('should swap action verb after interval', async () => {
    render(TheHeadline);
    vi.advanceTimersToNextTimer();
    await nextTick();

    const actionPhrase = screen.getByRole('heading', {
      name: /create for everyone/i,
    });

    expect(actionPhrase).toBeInTheDocument();
  });

  it('should removes interval when component disappears', () => {
    const clearInterval = vi.fn();
    vi.stubGlobal('clearInterval', clearInterval);

    const { unmount } = render(TheHeadline);
    unmount();

    expect(clearInterval).toHaveBeenCalled();
  });
});
