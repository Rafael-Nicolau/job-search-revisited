import { render, screen } from '@testing-library/vue';

import ActionButton from '@/components/shared/ActionButton.vue';

describe('ActionButton', () => {
  it('should render text', () => {
    render(ActionButton, {
      props: {
        text: 'test me',
        type: 'primary',
      },
    });

    const button = screen.getByRole('button', { name: /test me/i });
    expect(button).toBeInTheDocument();
  });

  it('should apply one of the several styles to the button', () => {
    render(ActionButton, {
      props: {
        text: 'test me',
        type: 'primary',
      },
    });

    const button = screen.getByRole('button', { name: /test me/i });
    expect(button).toHaveClass('primary');
  });
});
