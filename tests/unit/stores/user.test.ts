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

  it('should store degrees that the user would like to filter jobs by', () => {
    const store = useUserStore();
    expect(store.selectedDegrees).toEqual([]);
  });

  it('should store user search terms for skills and qualifications', () => {
    const store = useUserStore();
    expect(store.skillsSearchTerm).toBe('');
  });
});

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('loginUser', () => {
    it('should log the user in', () => {
      const store = useUserStore();
      store.LOGIN_USER();
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

  describe('ADD_SELECTED_DEGREES', () => {
    it('should update degrees that the user has chosen to filter jobs by', () => {
      const store = useUserStore();
      store.ADD_SELECTED_DEGREES(['Master', 'Bachelor']);
      expect(store.selectedDegrees).toEqual(['Master', 'Bachelor']);
    });
  });

  describe('UPDATE_SKILLS_SEARCH_TERM', () => {
    it('should receive search terms for skills the user has entered', () => {
      const store = useUserStore();
      store.skillsSearchTerm = '';
      store.UPDATE_SKILLS_SEARCH_TERM('Vue');
      expect(store.skillsSearchTerm).toBe('Vue');
    });
  });

  describe('CLEAR_USER_JOB_FILTER_SELECTIONS', () => {
    it('should remove all job filters that the user has chosen', () => {
      const store = useUserStore();
      store.selectedDegrees = ['test sample'];
      store.selectedJobTypes = ['test sample'];
      store.selectedOrganizations = ['test sample'];
      store.skillsSearchTerm = 'test sampe';

      store.CLEAR_USER_JOB_FILTER_SELECTIONS();

      expect(store.selectedDegrees).toEqual([]);
      expect(store.selectedJobTypes).toEqual([]);
      expect(store.selectedOrganizations).toEqual([]);
      expect(store.skillsSearchTerm).toEqual('');
    });
  });
});
