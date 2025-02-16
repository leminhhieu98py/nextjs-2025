/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
export default function CatchAllPage({ params }) {
  const catchAllSlug: string[] = params.catchAllSlug;
  console.log('catchAllSlug---->', catchAllSlug);

  return (
    <>
      <h1>CatchAllPage catchAllSlug</h1>
      {catchAllSlug ? (
        catchAllSlug.map((slug, index) => <h1 key={index}>This is segment: {slug}</h1>)
      ) : (
        <h1>This is home page, no slugs is loaded</h1>
      )}
    </>
  );
}

// TODO: chore