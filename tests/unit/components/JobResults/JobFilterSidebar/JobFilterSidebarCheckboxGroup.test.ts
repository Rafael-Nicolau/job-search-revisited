import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createTestingPinia } from '@pinia/testing';
import { useRouter } from 'vue-router';
vi.mock('vue-router');

import JobFilterSidebarCheckboxGroup from '@/components/JobResults/JobFilterSidebar/JobFiltersSidebarCheckboxGroup.vue';
import type { Mock } from 'vitest';

const useRouterMock = useRouter as Mock;

describe('JobFilterSidebarCheckboxGroup', () => {
  interface JobFiltersSidebarCheckboxGroupProps {
    header: string;
    uniqueValues: Set<string>;
    action: Mock;
  }
  const createProps = (
    props: Partial<JobFiltersSidebarCheckboxGroupProps> = {}
  ) => ({
    header: 'Some header',
    uniqueValues: new Set(['a', 'b']),
    action: vi.fn(),
    ...props,
  });
  const renderJobFilterSidebarCheckboxGroup = (
    props: JobFiltersSidebarCheckboxGroupProps
  ) => {
    const pinia = createTestingPinia();

    render(JobFilterSidebarCheckboxGroup, {
      props: {
        ...props,
      },
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });
  };

  it('should render unique list of values', async () => {
    const props = createProps({
      header: 'Job Types',
      uniqueValues: new Set(['Full-Time', 'Part-Time']),
    });
    renderJobFilterSidebarCheckboxGroup(props);

    const button = screen.getByRole('button', { name: /job types/i });
    await userEvent.click(button);

    const jobTypesListItems = screen.getAllByRole('listitem');
    const jobTypes = jobTypesListItems.map((node) => node.textContent);
    expect(jobTypes).toEqual(['Full-Time', 'Part-Time']);
  });

  describe('when user clicks on the checkbox', () => {
    it('should communicate that the user has selected box for values', async () => {
      useRouterMock.mockReturnValue({ push: vi.fn() });
      const action = vi.fn();
      const props = createProps({
        header: 'Job Types',
        uniqueValues: new Set(['Full-Time', 'Part-Time']),
        action,
      });
      renderJobFilterSidebarCheckboxGroup(props);

      const button = screen.getByRole('button', { name: /job types/i });
      await userEvent.click(button);

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i,
      });
      await userEvent.click(fullTimeCheckbox);

      expect(action).toHaveBeenCalledWith(['Full-Time']);
    });
  });

  it('should navigate the user to job results page to see fresh batch of filtered jobs', async () => {
    const push = vi.fn();
    useRouterMock.mockReturnValue({ push });
    const props = createProps({
      header: 'Job Types',
      uniqueValues: new Set(['Full-Time', 'Part-Time']),
    });
    renderJobFilterSidebarCheckboxGroup(props);

    const button = screen.getByRole('button', { name: /job types/i });
    await userEvent.click(button);

    const fullTimeCheckbox = screen.getByRole('checkbox', {
      name: /full-time/i,
    });
    await userEvent.click(fullTimeCheckbox);

    expect(push).toHaveBeenCalledWith({ name: 'JobResults' });
  });
});
