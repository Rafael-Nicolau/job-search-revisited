import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import CollapsableAccordion from '../../../../src/components/Shared/CollapsableAccordion.vue';

describe('CollapsableAccordion', () => {
  const renderCollapsableAccordion = (config = {}) => {
    render(CollapsableAccordion, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
      props: {
        header: 'My Category',
      },
      slots: {
        default: '<h3>My Nested Child</h3>',
      },
      ...config,
    });
  };

  it('should render child content', async () => {
    renderCollapsableAccordion();

    expect(screen.queryByText('My Nested Child')).not.toBeInTheDocument();
    const button = screen.getByRole('button', { name: /my category/i });
    await userEvent.click(button);
    expect(screen.getByText('My Nested Child')).toBeInTheDocument();
  });

  describe('When parent does not provide custom child content', async () => {
    it('renders default content', async () => {
      renderCollapsableAccordion({ slots: {} });

      const button = screen.getByRole('button', { name: /my category/i });
      await userEvent.click(button);
      expect(
        screen.getByText('Unable to load content - Slot not found')
      ).toBeInTheDocument();
    });
  });
});
