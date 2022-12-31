import { render, screen } from '@testing-library/vue';
import { RouterLinkStub } from '@vue/test-utils';

import JobListing from '@/components/JobResults/JobListing.vue';
import type { Job } from '@/api/types';
import { createJob } from 'tests/utils/createJob';

describe('JobListing', () => {
  const renderJobListing = (job: Job) => {
    render(JobListing, {
      global: {
        stubs: {
          'router-link': RouterLinkStub,
        },
      },
      props: {
        job: {
          ...job,
        },
      },
    });
  };

  it('should render job Title', () => {
    const jobProps = createJob({ title: 'Test Title' });
    renderJobListing(jobProps);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should render job Organization', () => {
    const jobProps = createJob({ organization: 'Test Organization' });
    renderJobListing(jobProps);
    expect(screen.getByText('Test Organization')).toBeInTheDocument();
  });

  it('should render job Locations', () => {
    const jobProps = createJob({ locations: ['SP', 'RJ'] });
    renderJobListing(jobProps);
    expect(screen.getByText('SP')).toBeInTheDocument();
    expect(screen.getByText('RJ')).toBeInTheDocument();
  });

  it('should render job qualifications', () => {
    const jobProps = createJob({ minimumQualifications: ['Test', 'Vue'] });
    renderJobListing(jobProps);
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Vue')).toBeInTheDocument();
  });
});
