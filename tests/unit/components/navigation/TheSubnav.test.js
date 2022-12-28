import { render, screen } from '@testing-library/vue';
import { createTestingPinia } from '@pinia/testing';

import { useJobsStore } from '@/stores/jobs';

import TheSubnav from '@/components/navigation/TheSubnav.vue';

const $route = (location = 'Home') => {
  return { name: location };
};
const pinia = createTestingPinia();
const jobStore = useJobsStore();

const renderSubnav = (boolean, location) => {
  render(TheSubnav, {
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
      plugins: [pinia],
      mocks: {
        $route: $route(location),
      },
    },
  });
};

describe('TheSubnav', () => {
  describe('When user is on Jobs page', () => {
    it('should displays the job count', async () => {
      renderSubnav(true, 'JobResults');
      jobStore.FILTERED_JOBS = Array(16).fill({});

      const jobCount = await screen.findByText('16');
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
