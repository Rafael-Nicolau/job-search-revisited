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

  describe('INCLUDE_JOB_BY_ORGANIZATION', () => {
    describe('when the user has not selected any organizations', () => {
      it('should show all jobs', () => {
        const userStore = useUserStore();
        userStore.selectedOrganizations = [];
        const store = useJobsStore();
        const jobs = [
          { organization: 'Google' },
          { organization: 'Amazon' },
          { organization: 'Google' },
        ];

        const result = store.INCLUDE_JOB_BY_ORGANIZATION(jobs);

        expect(result).toBe(true);
      });
    });

    it('should identify if job is associated with given organization', () => {
      const userStore = useUserStore();
      userStore.selectedOrganizations = ['Google', 'Amazon'];
      const store = useJobsStore();
      const jobs = { organization: 'Google' };

      const result = store.INCLUDE_JOB_BY_ORGANIZATION(jobs);

      expect(result).toBe(true);
    });
  });

  describe('INCLUDE_JOB_BY_JOB_TYPE', () => {
    describe('when the user has not selected any JobType', () => {
      it('should show all jobs', () => {
        const userStore = useUserStore();
        userStore.selectedJobType = [];
        const store = useJobsStore();
        const jobs = [
          { jobType: 'Full-Time' },
          { jobType: 'Part-Time' },
          { jobType: 'Full-Time' },
        ];

        const result = store.INCLUDE_JOB_BY_JOB_TYPE(jobs);

        expect(result).toBe(true);
      });
    });

    it('should identify if job is associated with given JobType', () => {
      const userStore = useUserStore();
      userStore.selectedJobType = ['Full-Time', 'Part-Time'];
      const store = useJobsStore();
      const jobs = { organization: 'Full-Time' };

      const result = store.INCLUDE_JOB_BY_JOB_TYPE(jobs);

      expect(result).toBe(true);
    });
  });
});
