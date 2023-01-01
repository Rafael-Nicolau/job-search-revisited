import { createPinia, setActivePinia } from 'pinia';
import axios from 'axios';
import { useDegreeStore } from '@/stores/degrees';
import type { Mock } from 'vitest';
import { createDegree } from 'tests/utils/createDegree';

vi.mock('axios');
const axiosGetMock = axios.get as Mock;

beforeAll(() => {
  setActivePinia(createPinia());
});

describe('state', () => {
  it('should store all degrees that jobs may require', () => {
    const store = useDegreeStore();
    expect(store.degrees).toEqual([]);
  });
});

describe('actions', () => {
  describe('FETCH_DEGREES', () => {
    it('should makes API request and stores received degrees', async () => {
      axiosGetMock.mockResolvedValue({
        data: [
          {
            id: 1,
            degree: 'Bachelor',
          },
        ],
      });

      const store = useDegreeStore();
      await store.FETCH_DEGREES();
      expect(store.degrees).toEqual([
        {
          id: 1,
          degree: 'Bachelor',
        },
      ]);
    });
  });
});

describe('getters', () => {
  describe('UNIQUE_DEGREES', () => {
    it('should find unique degrees from a collection of degrees', () => {
      const store = useDegreeStore();
      store.degrees = [
        createDegree({ degree: "Master's" }),
        createDegree({ degree: "Bachelor's" }),
      ];

      const result = store.UNIQUE_DEGREES;
      expect(result).toEqual(["Master's", "Bachelor's"]);
    });
  });
});
