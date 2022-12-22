import { render, screen } from '@testing-library/vue';

import TheSubnav from '@/components/navigation/TheSubnav.vue';

const renderMainNav = (boolean) => {
  render(TheSubnav, {
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
    data() {
      return {
        onJobResultsPage: boolean,
      };
    },
  });
};

describe('TheSubnav', () => {
  describe('When user is on Jobs page', () => {
    it('should displays the job count', () => {
      renderMainNav(true);

      const jobCount = screen.getByText('404');
      expect(jobCount).toBeInTheDocument();
    });
  });

  describe('When user is NOT on Jobs page', () => {
    it('should NOT displays the job count', () => {
      renderMainNav(false);

      const jobCount = screen.queryByText('404');
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
