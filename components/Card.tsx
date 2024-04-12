export default function Card({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className='border rounded-md border-gray-600 p-4'>{children}</div>;
}
