import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createTestingPinia } from '@pinia/testing';

import JobFilterSidebarOrganizations from '@/components/JobResults/JobFilterSidebar/JobFiltersSidebarOrganizations.vue';
import { useJobsStore } from '@/stores/jobs';
import { useUserStore } from '@/stores/user';

describe('JobFiltersSidebarOrganizations', () => {
  const renderJobFilterSidebarOrganizations = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    const userStore = useUserStore();
    const $router = { push: vi.fn() };

    render(JobFilterSidebarOrganizations, {
      global: {
        mocks: {
          $router,
        },
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { jobsStore, userStore, $router };
  };

  it('should render unique list of organizations from jobs', async () => {
    const { jobsStore } = renderJobFilterSidebarOrganizations();
    jobsStore.UNIQUE_ORGANIZATIONS = new Set(['Google', 'Amazon']);

    const button = screen.getByRole('button', { name: /organization/i });
    await userEvent.click(button);

    const organizationListItems = screen.getAllByRole('listitem');
    const organizations = organizationListItems.map((node) => node.textContent);
    expect(organizations).toEqual(['Google', 'Amazon']);
  });

  describe('when user clicks checkbox', () => {
    it('should communicate that the user has selected box for organization', async () => {
      const { userStore, jobsStore } = renderJobFilterSidebarOrganizations();
      jobsStore.UNIQUE_ORGANIZATIONS = new Set(['Google', 'Amazon']);

      const button = screen.getByRole('button', { name: /organization/i });
      await userEvent.click(button);

      const googleCheckbox = screen.getByRole('checkbox', { name: /google/i });
      await userEvent.click(googleCheckbox);

      expect(userStore.ADD_SELECTED_ORGANIZATIONS).toHaveBeenCalledWith([
        'Google',
      ]);
    });

    it('should navigate the user to job results page to see fresh batch of filtered jobs', async () => {
      const { jobsStore, $router } = renderJobFilterSidebarOrganizations();
      jobsStore.UNIQUE_ORGANIZATIONS = new Set(['Google', 'Amazon']);

      const button = screen.getByRole('button', { name: /organization/i });
      await userEvent.click(button);

      const googleCheckbox = screen.getByRole('checkbox', { name: /google/i });
      await userEvent.click(googleCheckbox);

      expect($router.push).toHaveBeenCalledWith({ name: 'JobResults' });
    });
  });
});
