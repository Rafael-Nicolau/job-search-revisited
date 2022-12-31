import { render, screen } from '@testing-library/vue';
import { createTestingPinia } from '@pinia/testing';
import { RouterLinkStub } from '@vue/test-utils';

import { useJobsStore } from '@/stores/jobs';

import TheSubnav from '@/components/Navigation/TheSubnav.vue';

import { useRoute } from 'vue-router';
import type { Mock } from 'vitest';
vi.mock('vue-router');

const useRouteMock = useRoute as Mock;
const pinia = createTestingPinia();
const jobStore = useJobsStore();

const renderSubnav = () => {
  render(TheSubnav, {
    global: {
      stubs: {
        FontAwesomeIcon: true,
        RouterLink: RouterLinkStub,
      },
      plugins: [pinia],
    },
  });
};

describe('TheSubnav', () => {
  describe('When user is on Jobs page', () => {
    it('should displays the job count', async () => {
      useRouteMock.mockReturnValue({ name: 'JobResults' });
      renderSubnav();
      // @ts-expect-error
      jobStore.FILTERED_JOBS = Array(16).fill({});

      const jobCount = await screen.findByText('16');
      expect(jobCount).toBeInTheDocument();
    });
  });

  describe('When user is NOT on Jobs page', () => {
    it('should NOT displays the job count', () => {
      useRouteMock.mockReturnValue({ name: 'Home' });
      renderSubnav();

      const jobCount = screen.queryByText('jobs Matched');
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
