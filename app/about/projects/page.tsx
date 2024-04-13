import ProjectList from './components/ProjectList';
import ProjectListLoading from './components/ProjectListLoading';
import { Suspense } from 'react';

// Opt out of caching for all data requests in the route segment.
// export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  return (
    <div>
      <h1 className='mt-2 mb-8 text-xl'>Projects</h1>
      <div className='mb-8'>Hello, this is the list of my repos!</div>
      <Suspense fallback={<ProjectListLoading />}>
        <ProjectList />
      </Suspense>
    </div>
  );
}
