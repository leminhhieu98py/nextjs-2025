import Link from 'next/link';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ArchivePageDetail({ params }: Props) {
  const { slug } = await params;

  return (
    <>
      <h1>Archive Detail ------------ {slug}</h1>
      <h2>Back to home here</h2>
      <Link href="/news">Go back to news</Link>
    </>
  );
}
