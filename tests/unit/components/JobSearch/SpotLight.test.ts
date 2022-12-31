import { render, screen } from '@testing-library/vue';
import axios from 'axios';

import Spotlight from '@/components/JobSearch/SpotLight.vue';
import type { Mock } from 'vitest';

vi.mock('axios');
const axiosGetMock = axios.get as Mock;

describe('Spotlight', () => {
  beforeEach(() => {
    const mockSpotlightsResponse = (spotlight = {}) => {
      axiosGetMock.mockResolvedValue({
        data: [
          {
            id: 1,
            img: 'Some Image',
            title: 'Some Title',
            description: 'Some description',
            ...spotlight,
          },
        ],
      });
    };
    mockSpotlightsResponse();
  });

  it('provides image to parent component', async () => {
    render(Spotlight, {
      slots: {
        default: `<template #default="slotProps">
        {{ slotProps.img }}
        </template>`,
      },
    });

    const img = await screen.findByText('Some Image');
    expect(img).toBeInTheDocument();
  });

  it('provides image to parent component', async () => {
    render(Spotlight, {
      slots: {
        default: `<template #default="slotProps">
        {{ slotProps.title }}
        </template>`,
      },
    });

    const title = await screen.findByText('Some Title');
    expect(title).toBeInTheDocument();
  });

  it('provides image to parent component', async () => {
    render(Spotlight, {
      slots: {
        default: `<template #default="slotProps">
        {{ slotProps.description }}
        </template>`,
      },
    });

    const desc = await screen.findByText('Some description');
    expect(desc).toBeInTheDocument();
  });
});
