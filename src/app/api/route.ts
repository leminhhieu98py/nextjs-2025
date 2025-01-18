const GET = (request) => {
  console.log('request', request);

  return new Response('Hello world from nextjs API');
};

export { GET };
