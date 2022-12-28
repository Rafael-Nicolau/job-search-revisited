import { createPinia, setActivePinia } from 'pinia';
import { useUserStore } from '@/stores/user';

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should keep track of user login status', () => {
    const store = useUserStore();
    expect(store.isLoggedIn).toBe(false);
  });

  it('should store organizations that the user would like to filter jobs by', () => {
    const store = useUserStore();
    expect(store.selectedOrganizations).toEqual([]);
  });

  it('should store job types that the user would like to filter', () => {
    const store = useUserStore();
    expect(store.selectedJobTypes).toEqual([]);
  });
});

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('loginUser', () => {
    it('should log the user in', () => {
      const store = useUserStore();
      store.loginUser();
      expect(store.isLoggedIn).toBe(true);
    });
  });

  describe('ADD_SELECTED_ORGANIZATIONS', () => {
    it('should update organizations the user has chosen to filter jobs by', () => {
      const store = useUserStore();
      store.ADD_SELECTED_ORGANIZATIONS(['org1', 'org2']);
      expect(store.selectedOrganizations).toEqual(['org1', 'org2']);
    });
  });

  describe('ADD_SELECTED_JOB_TYPES', () => {
    it('should update jog types the user has chosen to filter jobs by', () => {
      const store = useUserStore();
      store.ADD_SELECTED_JOB_TYPES(['full time', 'part-time']);
      expect(store.selectedJobTypes).toEqual(['full time', 'part-time']);
    });
  });
});
