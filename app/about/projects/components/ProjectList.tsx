import { reposSchema } from '@/ValidationSchemas/repos';

export default async function ProjectList() {
  const response = await fetch('http://localhost:3001/repos', { cache: 'no-store' });
  const jsonData = await response.json();
  const validationResult = await reposSchema.safeParseAsync(jsonData);

  if (validationResult.success) {
    const repos = validationResult.data;

    return (
      <ul>
        {repos.map(repo => (
          <li key={repo.id} className='mb-4'>
            <div>{repo.title}</div>
            <div>{repo.description}</div>
            <div>{repo.stargazers_count}</div>
          </li>
        ))}
      </ul>
    );
  } else {
    console.error('Validation error:', validationResult.error);
    return <div>Validation error: {validationResult.error.message}</div>;
  }
}
