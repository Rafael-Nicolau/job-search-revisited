import { render, screen } from '@testing-library/vue';

import MainNav from '@/components/MainNav.vue';

describe('MainNav', () => {
  it('displays the company name', () => {
    render(MainNav);
    const companyName = screen.getByText('Nicolau Careers');
    expect(companyName).toBeInTheDocument();
  });

  it('should display menu items for navigation', () => {
    render(MainNav);
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
});
