import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createTestingPinia } from '@pinia/testing';

import { useUserStore } from '@/stores/user';

import JobFiltersSidebarSkills from '@/components/JobResults/JobFilterSidebar/JobFiltersSidebarSkills.vue';

describe('JobFilterSidebarSkills', () => {
  const renderJobFiltersSidebarSkills = () => {
    const pinia = createTestingPinia();
    const userStore = useUserStore();

    render(JobFiltersSidebarSkills, {
      global: {
        plugins: [pinia],
      },
    });

    return { userStore };
  };

  it('should populate search input from store', async () => {
    const { userStore } = renderJobFiltersSidebarSkills();
    userStore.skillsSearchTerm = 'Programmer';

    const input = await screen.findByRole<HTMLInputElement>('textbox');
    expect(input.value).toBe('Programmer');
  });

  it('should writes user input to store', async () => {
    const { userStore } = renderJobFiltersSidebarSkills();
    userStore.skillsSearchTerm = '';

    const input = screen.getByRole<HTMLInputElement>('textbox');
    await userEvent.type(input, 'Vue');
    await userEvent.click(document.body);
    expect(userStore.UPDATE_SKILLS_SEARCH_TERM).toHaveBeenCalledWith('Vue');
  });

  it('should remove whitespace from user input', async () => {
    const { userStore } = renderJobFiltersSidebarSkills();
    userStore.skillsSearchTerm = '';

    const input = screen.getByRole<HTMLInputElement>('textbox');
    await userEvent.type(input, '   Vue   ');
    await userEvent.click(document.body);
    expect(userStore.UPDATE_SKILLS_SEARCH_TERM).toHaveBeenCalledWith('Vue');
  });
});