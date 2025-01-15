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
