import { render, screen } from '@testing-library/vue';
import { RouterLinkStub } from '@vue/test-utils';

import JobListing from '@/components/JobResults/JobListing.vue';

describe('JobListing', () => {
  const createJobProps = (jobProps = {}) => ({
    title: 'Vue Dev',
    organization: 'Super Company',
    locations: ['New York', 'Los Angeles'],
    minimumQualifications: ['Program', 'Google search'],
    ...jobProps,
  });

  const renderJobListing = (jobProps) => {
    render(JobListing, {
      global: {
        stubs: {
          'router-link': RouterLinkStub,
        },
      },
      props: {
        job: {
          ...jobProps,
        },
      },
    });
  };

  it('should render job Title', () => {
    const jobProps = createJobProps({ title: 'Test Title' });
    renderJobListing(jobProps);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should render job Organization', () => {
    const jobProps = createJobProps({ organization: 'Test Organization' });
    renderJobListing(jobProps);
    expect(screen.getByText('Test Organization')).toBeInTheDocument();
  });

  it('should render job Locations', () => {
    const jobProps = createJobProps({ locations: ['SP', 'RJ'] });
    renderJobListing(jobProps);
    expect(screen.getByText('SP')).toBeInTheDocument();
    expect(screen.getByText('RJ')).toBeInTheDocument();
  });

  it('should render job qualifications', () => {
    const jobProps = createJobProps({ minimumQualifications: ['Test', 'Vue'] });
    renderJobListing(jobProps);
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Vue')).toBeInTheDocument();
  });
});
