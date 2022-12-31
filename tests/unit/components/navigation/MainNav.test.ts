import type { Mock } from 'vitest';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { RouterLinkStub } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import MainNav from '@/components/Navigation/MainNav.vue';
import { useUserStore } from '@/stores/user';
import { useRoute } from 'vue-router';
vi.mock('vue-router');

const useRouteMock = useRoute as Mock;

describe('MainNav', () => {
  const renderMainNav = () => {
    //const pinia = createTestingPinia({ stubActions: false }); //will use the REAL store
    const pinia = createTestingPinia();
    useRouteMock.mockReturnValue({ name: 'Home' });
    render(MainNav, {
      global: {
        plugins: [pinia], //will use pinia
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub,
        },
      },
    });
  };

  it('displays the company name', () => {
    renderMainNav();
    const companyName = screen.getByText('Nicolau Careers');
    expect(companyName).toBeInTheDocument();
  });

  it('should display menu items for navigation', () => {
    renderMainNav();
    const navigationMenuItems = screen.getAllByRole('listitem');
    const navigationMenuTexts = navigationMenuItems.map(
      (item) => item.textContent
    );
    expect(navigationMenuTexts).toEqual([
      'Teams',
      'Locations',
      'Life at Nicolau Careers',
      'How we hire',
      'Students',
      'Jobs',
    ]);
  });

  describe('When the user Logs in', () => {
    it('should display user profile picture', async () => {
      renderMainNav();
      const userStore = useUserStore();

      let profileImage = screen.queryByRole('img', {
        name: /user profile image/i,
      });
      expect(profileImage).not.toBeInTheDocument();

      const loginButton = screen.getByRole('button', {
        name: /sign in/i,
      });
      userStore.isLoggedIn = true;
      await userEvent.click(loginButton);

      profileImage = screen.queryByRole('img', {
        name: /user profile image/i,
      });
      expect(profileImage).toBeInTheDocument();
    });
  });
});
