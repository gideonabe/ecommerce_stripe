import React from 'react';
import { client, urlFor } from '../../../lib/client';
import ProductDetailsClient from './ProductDetailsClient';

async function fetchProductDetails(slug) {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return { product, products };
}

export async function generateStaticParams() {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  return products.map((product) => ({
    slug: product.slug.current,
  }));
}

const ProductDetails = async ({ params }) => {
  const { slug } = await params;
  const { product, products } = await fetchProductDetails(slug);

  return (
    <ProductDetailsClient product={product} products={products} />
  );
};

export default ProductDetails;
