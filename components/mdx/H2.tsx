export default function H1({
  children,
}: Readonly<{ children?: React.ReactNode }>) {
  return <h2 className='mb-8 text-xl not-prose'>{children}</h2>;
}
