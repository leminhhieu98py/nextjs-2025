import fs from 'fs/promises';
import path from 'path';

export async function getStaticProps() {
  const pathName = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(pathName);
  const data = JSON.parse(jsonData);

  return {
    props: data
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
