import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createTestingPinia } from '@pinia/testing';

import JobFilterSidebarJobTypes from '@/components/JobResults/JobFilterSidebar/JobFiltersSidebarJobTypes.vue';
import { useJobsStore } from '@/stores/jobs';
import { useUserStore } from '@/stores/user';

describe('JobFiltersSidebarOrganizations', () => {
  const renderJobFilterSidebarJobTypes = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    const userStore = useUserStore();
    const $router = { push: vi.fn() };

    render(JobFilterSidebarJobTypes, {
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

  it('should render unique list of job types from jobs', async () => {
    const { jobsStore } = renderJobFilterSidebarJobTypes();
    jobsStore.UNIQUE_JOB_TYPES = new Set(['Full-Time', 'Part-Time']);

    const button = screen.getByRole('button', { name: /job types/i });
    await userEvent.click(button);

    const jobTypesListItems = screen.getAllByRole('listitem');
    const jobTypes = jobTypesListItems.map((node) => node.textContent);
    expect(jobTypes).toEqual(['Full-Time', 'Part-Time']);
  });

  describe('when user clicks on the checkbox', () => {
    it('should communicate that the user has selected box for job type', async () => {
      const { userStore, jobsStore } = renderJobFilterSidebarJobTypes();
      jobsStore.UNIQUE_JOB_TYPES = new Set(['Full-Time', 'Part-Time']);

      const button = screen.getByRole('button', { name: /job types/i });
      await userEvent.click(button);

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i,
      });
      await userEvent.click(fullTimeCheckbox);

      expect(userStore.ADD_SELECTED_JOB_TYPES).toHaveBeenCalledWith([
        'Full-Time',
      ]);
    });
  });

  it('should navigate the user to job results page to see fresh batch of filtered jobs', async () => {
    const { jobsStore, $router } = renderJobFilterSidebarJobTypes();
    jobsStore.UNIQUE_JOB_TYPES = new Set(['Full-Time', 'Part-Time']);

    const button = screen.getByRole('button', { name: /job types/i });
    await userEvent.click(button);

    const fullTimeCheckbox = screen.getByRole('checkbox', {
      name: /full-time/i,
    });
    await userEvent.click(fullTimeCheckbox);

    expect($router.push).toHaveBeenCalledWith({ name: 'JobResults' });
  });
});
