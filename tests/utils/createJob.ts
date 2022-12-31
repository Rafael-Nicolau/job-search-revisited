import type { Job } from '@/api/types';

export const createJob = (job: Partial<Job> = {}): Job => ({
  id: 1,
  title: 'Angular Developer',
  organization: 'Vue and Me',
  degree: "Master's",
  jobType: 'Intern',
  locations: ['Lisbon'],
  minimumQualifications: ['Mesh granular deliverable'],
  preferredQualifications: ['Mesh wireless metrics'],
  description: ['Away someone forget'],
  dateAdded: '2021-07-04',
  ...job,
});
