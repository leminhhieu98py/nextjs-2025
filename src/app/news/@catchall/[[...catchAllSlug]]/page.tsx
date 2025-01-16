export default async function CatchAllPage(params: { catchAllSlug: string }) {
  const catchAllSlug = await params.catchAllSlug;
  console.log('catchAllSlug---->', catchAllSlug);

  return (
    <>
      <h1>CatchAllPage catchAllSlug</h1>
    </>
  );
}
