import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import { useRouter } from 'vue-router';
vi.mock('vue-router');

import JobSearchForm from '@/components/JobSearch/JobSearchForm.vue';
import { vi, type Mock } from 'vitest';

const useRouterMock = useRouter as Mock;

describe('JobSearchForm', () => {
  describe('when user submits form', () => {
    it('should direct the user to job results page with user search param', async () => {
      const push = vi.fn();
      useRouterMock.mockReturnValue({ push });

      render(JobSearchForm, {
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });

      const roleInput = screen.getByRole('textbox', {
        name: /role/i,
      });
      await userEvent.type(roleInput, 'test role');

      const locationInput = screen.getByRole('textbox', {
        name: /where?/i,
      });
      await userEvent.type(locationInput, 'test location');

      const submitButton = screen.getByRole('button', {
        name: /search/i,
      });
      await userEvent.click(submitButton);

      expect(push).toHaveBeenCalledWith({
        name: 'JobResults',
        query: {
          role: 'test role',
          location: 'test location',
        },
      });
    });
  });
});
