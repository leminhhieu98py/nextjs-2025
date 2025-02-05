import fs from 'fs/promises';
import path from 'path';
import Head from 'next/head';

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          pid: 'p1'
        }
      },
      {
        params: {
          pid: 'p2'
        }
      },
      {
        params: {
          pid: 'p3'
        }
      }
    ],
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const { pid } = params;
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

  const product = data.products.find((item) => item.id === pid);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      product
    }
  };
}

export default function ProductDetailPage({ product }) {
  return (
    <>
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={product.description} />
      </Head>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
}
