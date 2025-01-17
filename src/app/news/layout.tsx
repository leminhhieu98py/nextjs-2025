import Link from 'next/link';

export default function NewsLayout({
  children,
  archive,
  latest
}: Readonly<{
  children: React.ReactNode;
  archive: React.ReactNode;
  latest: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Link href="/news/1">Go to optional catch all 1</Link>
        <br />
        <hr />
        {archive}
        <br />
        <hr />
        {latest}
      </body>
    </html>
  );
}
