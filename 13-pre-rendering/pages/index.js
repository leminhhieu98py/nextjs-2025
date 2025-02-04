export async function getStaticProps() {
  return {
    props: {
      products: [
        {
          id: 1,
          title: 'P1'
        },
        {
          id: 2,
          title: 'P2'
        }
      ]
    }
  };
}

function HomePage({ products = [] }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

export default HomePage;
