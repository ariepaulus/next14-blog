import ProjectList from './components/ProjectList';
import ProjectListLoading from './components/ProjectListLoading';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
};

export default async function ProjectsPage() {
  return (
    <div>
      <h1 className='mt-2 mb-8 text-xl'>My Projects</h1>
      <div className='mb-8'>Hello, this is the list of my repos!</div>
      <ErrorBoundary fallback={<div>Cannot fetch projects currently!</div>}>
        <Suspense fallback={<ProjectListLoading />}>
          <ProjectList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
