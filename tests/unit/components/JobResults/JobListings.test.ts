import { render, screen } from '@testing-library/vue';
import { RouterLinkStub } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useRoute } from 'vue-router';
vi.mock('vue-router');
const useRouteMock = useRoute as Mock;

import JobListings from '@/components/JobResults/JobListings.vue';
import { useJobsStore } from '@/stores/jobs';
import { useDegreeStore } from '@/stores/degrees';
import type { Mock } from 'vitest';

describe('JobListings', () => {
  const renderJobListings = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    //@ts-expect-error
    jobsStore.FILTERED_JOBS = Array(15).fill({});
    const degreeStore = useDegreeStore();

    render(JobListings, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    return { jobsStore, degreeStore };
  };

  it('should fetch jobs', () => {
    useRouteMock.mockReturnValue({ query: {} });

    const { jobsStore } = renderJobListings();

    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled();
  });

  it('should fetch degrees', () => {
    useRouteMock.mockReturnValue({ query: {} });

    const { degreeStore } = renderJobListings();

    expect(degreeStore.FETCH_DEGREES).toHaveBeenCalled();
  });

  it('should display maximum of 10 jobs', async () => {
    useRouteMock.mockReturnValue({ query: { page: '1' } });

    const { jobsStore } = renderJobListings();
    //@ts-expect-error
    jobsStore.FILTERED_JOBS = Array(15).fill({});

    const jobListings = await screen.findAllByRole('listitem');
    expect(jobListings).toHaveLength(10);
  });

  describe('when params exclude page number', () => {
    it('should display page number 1', () => {
      useRouteMock.mockReturnValue({ query: {} });

      renderJobListings();

      expect(screen.getByText('Page 1')).toBeInTheDocument();
    });
  });

  describe('when params include page number', () => {
    it('should display page number', () => {
      useRouteMock.mockReturnValue({ query: { page: '3' } });

      renderJobListings();
      expect(screen.getByText('Page 3')).toBeInTheDocument();
    });
  });

  describe('when user is on fist page', () => {
    it('should not show link to previous page', async () => {
      useRouteMock.mockReturnValue({ query: { page: '1' } });

      const { jobsStore } = renderJobListings();
      //@ts-expect-error
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole('listitem');
      const previousLink = screen.queryByRole('link', { name: /previous/i });

      expect(previousLink).not.toBeInTheDocument();
    });

    it('should show link to next page', async () => {
      useRouteMock.mockReturnValue({ query: { page: '1' } });

      const { jobsStore } = renderJobListings();
      //@ts-expect-error
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole('listitem');
      const nextLink = screen.queryByRole('link', { name: /next/i });

      expect(nextLink).toBeInTheDocument();
    });
  });

  describe('when user is on last page', () => {
    it('should not show link to next page', async () => {
      useRouteMock.mockReturnValue({ query: { page: '2' } });

      const { jobsStore } = renderJobListings();
      //@ts-expect-error
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole('listitem');
      const nextLink = screen.queryByRole('link', { name: /next/i });

      expect(nextLink).not.toBeInTheDocument();
    });

    it('should show link to previous page', async () => {
      useRouteMock.mockReturnValue({ query: { page: '2' } });

      const { jobsStore } = renderJobListings();
      //@ts-expect-error
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole('listitem');
      const previousLink = screen.queryByRole('link', { name: /previous/i });

      expect(previousLink).toBeInTheDocument();
    });
  });
});
