function TestPage({ time }) {
  return <>Time: {time}</>;
}

export async function getServerSideProps({ params, req, res }) {
  console.log({ params, req, res });

  return {
    props: {
      time: Date.now()
    }
  };
}

export default TestPage;
