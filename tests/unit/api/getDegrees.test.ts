import type { Mock } from 'vitest';
import axios from 'axios';

import getDegrees from '@/api/getDegrees';

vi.mock('axios');
const axiosGetMock = axios.get as Mock;

describe('getDegrees', () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: 1,
          degree: 'Masters',
        },
      ],
    });
  });

  it('should fetch jobs that candidates can apply to', async () => {
    await getDegrees();
    expect(axios.get).toHaveBeenCalledWith('http://myfakeapi.com/degrees');
  });

  it('should extract jobs from the response', async () => {
    const degrees = await getDegrees();
    expect(degrees).toEqual([{ id: 1, degree: 'Masters' }]);
  });
});
