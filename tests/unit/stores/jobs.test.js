import { createPinia, setActivePinia } from 'pinia';
import axios from 'axios';
import { useJobsStore } from '@/stores/jobs';
import { useUserStore } from '@/stores/user';

vi.mock('axios');

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should store job listings', () => {
    const store = useJobsStore();
    expect(store.jobs).toEqual([]);
  });
});

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('FETCH_JOBS', () => {
    it('should make API request and store received jobs', async () => {
      axios.get.mockResolvedValue({ data: ['Job 1', 'Job 2'] });
      const store = useJobsStore();
      await store.FETCH_JOBS();
      expect(store.jobs).toEqual(['Job 1', 'Job 2']);
    });
  });
});

describe('Getters', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('UNIQUE_ORGANIZATIONS', () => {
    it('finds unique organizations from list of jobs', () => {
      const store = useJobsStore();
      store.jobs = [
        { organization: 'Google' },
        { organization: 'Amazon' },
        { organization: 'Google' },
      ];

      const results = store.UNIQUE_ORGANIZATIONS;

      expect(results).toEqual(new Set(['Google', 'Amazon']));
    });
  });

  describe('UNIQUE_JOB_TYPES', () => {
    it('should find unique job types from list of jobs', () => {
      const store = useJobsStore();
      store.jobs = [
        { jobType: 'Full-Time' },
        { jobType: 'Temporary' },
        { jobType: 'Full-Time' },
      ];

      const result = store.UNIQUE_JOB_TYPES;

      expect(result).toEqual(new Set(['Full-Time', 'Temporary']));
    });
  });

  describe('FILTERED_JOBS_BY_ORGANIZATIONS', () => {
    it('should identify jobs that are associated with the given organizations', () => {
      const jobsStore = useJobsStore();
      jobsStore.jobs = [
        { organization: 'Google' },
        { organization: 'Amazon' },
        { organization: 'Microsoft' },
      ];
      const userStore = useUserStore();
      userStore.selectedOrganizations = ['Google', 'Microsoft'];

      const result = jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS;

      expect(result).toEqual([
        { organization: 'Google' },
        { organization: 'Microsoft' },
      ]);
    });

    describe('FILTERED_JOBS_BY_JOB_TYPES', () => {
      it('should identify jobs that are associated with given job types', () => {
        const jobsStore = useJobsStore();
        jobsStore.jobs = [
          { jobType: 'Full-Time' },
          { jobType: 'Temporary' },
          { jobType: 'Part-Time' },
        ];

        const userStore = useUserStore();
        userStore.selectedJobTypes = ['Full-Time', 'Part-Time'];

        const result = jobsStore.FILTERED_JOBS_BY_JOB_TYPES;

        expect(result).toEqual([
          { jobType: 'Full-Time' },
          { jobType: 'Part-Time' },
        ]);
      });
    });

    describe('when the user has not selected any job types', () => {
      it('returns all jobs', () => {
        const jobsStore = useJobsStore();
        jobsStore.jobs = [
          { jobType: 'Full-Time' },
          { jobType: 'Temporary' },
          { jobType: 'Part-Time' },
        ];

        const userStore = useUserStore();
        userStore.selectedJobTypes = [];

        const result = jobsStore.FILTERED_JOBS_BY_JOB_TYPES;

        expect(result).toEqual([
          { jobType: 'Full-Time' },
          { jobType: 'Temporary' },
          { jobType: 'Part-Time' },
        ]);
      });
    });

    describe('when the user has not selected any organizations', () => {
      it('should return all jobs', () => {
        const jobsStore = useJobsStore();
        jobsStore.jobs = [
          { organization: 'Google' },
          { organization: 'Amazon' },
          { organization: 'Microsoft' },
        ];
        const userStore = useUserStore();
        userStore.selectedOrganizations = [];

        const result = jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS;

        expect(result).toEqual([
          { organization: 'Google' },
          { organization: 'Amazon' },
          { organization: 'Microsoft' },
        ]);
      });
    });
  });
});
