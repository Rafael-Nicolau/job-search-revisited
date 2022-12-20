import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import MainNav from '@/components/MainNav.vue';

describe('MainNav', () => {
  const renderMainNav = () => {
    render(MainNav, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
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
      let profileImage = screen.queryByRole('img', {
        name: /user profile image/i,
      });
      expect(profileImage).not.toBeInTheDocument();

      const loginButton = screen.getByRole('button', {
        name: /sign in/i,
      });
      await userEvent.click(loginButton);

      profileImage = screen.queryByRole('img', {
        name: /user profile image/i,
      });
      expect(profileImage).toBeInTheDocument();
    });
  });
});
