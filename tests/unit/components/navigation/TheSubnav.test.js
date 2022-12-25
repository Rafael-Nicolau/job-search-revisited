import { render, screen } from '@testing-library/vue';

import TheSubnav from '@/components/navigation/TheSubnav.vue';

const $route = (location = 'Home') => {
  return { name: location };
};

const renderSubnav = (boolean, location) => {
  render(TheSubnav, {
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
      mocks: {
        $route: $route(location),
      },
    },
  });
};

describe('TheSubnav', () => {
  describe('When user is on Jobs page', () => {
    it('should displays the job count', () => {
      renderSubnav(true, 'JobResults');

      const jobCount = screen.getByText('jobs Matched');
      expect(jobCount).toBeInTheDocument();
    });
  });

  describe('When user is NOT on Jobs page', () => {
    it('should NOT displays the job count', () => {
      renderSubnav(false);

      const jobCount = screen.queryByText('jobs Matched');
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
