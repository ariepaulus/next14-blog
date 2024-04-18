import { reposSchema } from '@/ValidationSchemas/repos';
import Card from '@/components/Card';

export default async function ProjectList() {
  const response = await fetch(
    'https://api.github.com/users/ariepaulus/repos',
    {
      cache: 'no-cache', // or 'reload', 'force-cache', 'only-if-cached'
    }
  );
  const jsonData = await response.json();
  const validationResult = await reposSchema.safeParseAsync(jsonData);

  if (validationResult.success) {
    const repos = validationResult.data;

    return (
      <ul className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {repos.map(repo => (
          <li key={repo?.id} className='mb-4'>
            <Card className='font-mono h-full'>
              <div className='flex justify-between items-center mb-4'>
                <div className='font-semibold'>{repo?.name}</div>
                <div>⭐{repo?.stargazers_count}</div>
              </div>
              <div>{repo?.description}</div>
            </Card>
          </li>
        ))}
      </ul>
    );
  } else {
    console.error('Validation error:', validationResult.error);
    return <div>Validation error: {validationResult.error.message}</div>;
  }
}
