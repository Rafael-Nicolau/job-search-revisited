import { render, screen } from '@testing-library/vue';
import { RouterLinkStub } from '@vue/test-utils';
import axios from 'axios';

import JobListings from '@/components/JobResults/JobListings.vue';

vi.mock('axios');

afterEach(() => {
  vi.clearAllMocks();
});

describe('JobListings', () => {
  const createRoute = (queryParams) => ({
    query: {
      page: '5',
      ...queryParams,
    },
  });

  const renderJobListings = ($route) => {
    render(JobListings, {
      global: {
        mocks: {
          $route,
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
  };

  it('should fetch jobs', () => {
    axios.get.mockResolvedValue({ data: [] });
    const $route = createRoute();

    renderJobListings($route);

    expect(axios.get).toHaveBeenCalledWith('http://myfakeapi.com/jobs');
  });

  it('should display maximum of 10 jobs', async () => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) });
    const $route = createRoute({ page: '1' });

    renderJobListings($route);

    const jobListings = await screen.findAllByRole('listitem');
    expect(jobListings).toHaveLength(10);
    vi.clearAllMocks();
  });

  it('should display error if cant load data', async () => {
    axios.get.mockRejectedValue();
    const $route = createRoute({ page: '1' });

    render(JobListings, {
      global: {
        mocks: {
          $route,
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
      data() {
        return {
          error: true,
        };
      },
    });

    const error = screen.getByText('Error loading data');

    expect(error).toBeInTheDocument();
  });

  describe('when params exclude page number', () => {
    it('should display page number 1', () => {
      const queryParams = { page: undefined };
      const $route = createRoute(queryParams);

      renderJobListings($route);

      expect(screen.getByText('Page 1')).toBeInTheDocument();
    });
  });

  describe('when params include page number', () => {
    it('should display page number', () => {
      const queryParams = { page: '3' };
      const $route = createRoute(queryParams);

      renderJobListings($route);
      expect(screen.getByText('Page 3')).toBeInTheDocument();
    });
  });

  describe('when user is on fist page', () => {
    it('should show link to previous page', async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      const queryParams = { page: '1' };
      const $route = createRoute(queryParams);

      renderJobListings($route);

      await screen.findAllByRole('listitem');
      const previousLink = screen.queryByRole('link', { name: /previous/i });

      expect(previousLink).not.toBeInTheDocument();
    });

    it('should show link to next page', async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      const queryParams = { page: '1' };
      const $route = createRoute(queryParams);

      renderJobListings($route);

      await screen.findAllByRole('listitem');
      const nextLink = screen.queryByRole('link', { name: /next/i });

      expect(nextLink).toBeInTheDocument();
    });
  });

  describe('when user is on last page', () => {
    it('should not show link to next page', async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      const queryParams = { page: '2' };
      const $route = createRoute(queryParams);

      renderJobListings($route);

      await screen.findAllByRole('listitem');
      const nextLink = screen.queryByRole('link', { name: /next/i });

      expect(nextLink).not.toBeInTheDocument();
    });

    it('should show link to previous page', async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      const queryParams = { page: '2' };
      const $route = createRoute(queryParams);

      renderJobListings($route);

      await screen.findAllByRole('listitem');
      const previousLink = screen.queryByRole('link', { name: /previous/i });

      expect(previousLink).toBeInTheDocument();
    });
  });
});
