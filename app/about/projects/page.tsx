import ProjectList from './components/ProjectList';
import ProjectListLoading from './components/ProjectListLoading';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Metadata } from 'next';
import H1 from '@/components/mdx/H1';

export const metadata: Metadata = {
  title: 'Projects',
};

export default async function ProjectsPage() {
  return (
    <div>
      <H1>My Projects</H1>
      <div className='mb-8'>Hello, this is the list of my repos!</div>
      <ErrorBoundary fallback={<div>Cannot fetch projects currently!</div>}>
        <Suspense fallback={<ProjectListLoading />}>
          <ProjectList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
