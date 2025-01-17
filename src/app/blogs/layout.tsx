import Link from 'next/link';

export default function BlogsLayout({
  children,
  latest
}: Readonly<{
  children: React.ReactNode;
  latest: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Link href="/blogs">Blogs hme</Link>
        <br />
        <Link href="/blogs/123">123</Link>
        <br />
        <Link href="/blogs/234">234</Link>
        <br />
        <Link href="/blogs/123/234">123234</Link>
        <br />
        <Link href="/blogs/234/345/456">234345456</Link>
        <br />
        {children}
        <br />
        <hr />
        {latest}
      </body>
    </html>
  );
}
