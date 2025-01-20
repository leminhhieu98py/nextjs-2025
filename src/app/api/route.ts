// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const GET = (request) => {
  console.log('request', request);

  return new Response('Hello world from nextjs API');
};

export { GET };
