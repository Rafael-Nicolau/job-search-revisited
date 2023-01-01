import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import { useUserStore } from '@/stores/user';

import JobFiltersSidebarPrompt from '@/components/JobResults/JobFilterSidebar/JobFiltersSidebarPrompt.vue';
import { createTestingPinia } from '@pinia/testing';

describe('JobFilterSidebarPrompt', () => {
  describe('when user clicks Clear Filters button', () => {
    it('should send message to clear all of user job search filters', async () => {
      const pinia = createTestingPinia();
      const userStore = useUserStore();

      render(JobFiltersSidebarPrompt, {
        global: {
          plugins: [pinia],
        },
      });

      const button = screen.getByRole('button', { name: /clear filters/i });
      await userEvent.click(button);

      expect(userStore.CLEAR_USER_JOB_FILTER_SELECTIONS).toHaveBeenCalled();
    });
  });
});
