import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import JobSearchForm from '@/components/JobSearch/JobSearchForm.vue';

describe('JobSearchForm', () => {
  describe('when user submits form', () => {
    it('should direct the user to job results page with user search param', async () => {
      const push = vi.fn();
      const $router = { push };

      render(JobSearchForm, {
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
          mocks: {
            $router,
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
