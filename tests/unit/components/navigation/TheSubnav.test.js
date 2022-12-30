import { render, screen } from '@testing-library/vue';
import { createTestingPinia } from '@pinia/testing';

import { useJobsStore } from '@/stores/jobs';

import TheSubnav from '@/components/navigation/TheSubnav.vue';

import { useRoute } from 'vue-router';
vi.mock('vue-router');

const pinia = createTestingPinia();
const jobStore = useJobsStore();

const renderSubnav = () => {
  render(TheSubnav, {
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
      plugins: [pinia],
    },
  });
};

describe('TheSubnav', () => {
  describe('When user is on Jobs page', () => {
    it('should displays the job count', async () => {
      useRoute.mockReturnValue({ name: 'JobResults' });
      renderSubnav();
      jobStore.FILTERED_JOBS = Array(16).fill({});

      const jobCount = await screen.findByText('16');
      expect(jobCount).toBeInTheDocument();
    });
  });

  describe('When user is NOT on Jobs page', () => {
    it('should NOT displays the job count', () => {
      useRoute.mockReturnValue({ name: 'Home' });
      renderSubnav();

      const jobCount = screen.queryByText('jobs Matched');
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
