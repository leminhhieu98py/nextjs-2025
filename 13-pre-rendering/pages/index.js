import fs from 'fs/promises';
import Link from 'next/link';
import path from 'path';

export async function getStaticProps() {
  const pathName = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(pathName);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: '/no-data' // sample route to redirect if can not get the data from the DB
      }
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: data,
    revalidate: 20
  };
}

function HomePage({ products = [] }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default HomePage;
