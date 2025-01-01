import React from 'react'

import {client} from '../lib/client'
import { Product, FooterBanner, HeroBanner } from '../components'


async function fetchData() {
  // Fetch products data
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  // Fetch banner data
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return { products, bannerData };
}


export default async function Page() {
  // Fetch data on the server side during rendering
  const { products, bannerData } = await fetchData();

  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      {/* {console.log(bannerData[0])} */}

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className='products-container'>
        {products?.map((product) => (
          <Product key={product._id} product={ product} />
        ))}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
}

// export const getServerSideProps = async () => {
//   const query = '*[_type == "product"]';
//   const products = await client.fetch(query);

//   const bannerQuery = '*[_type == "banner"]';
//   const bannerData = await client.fetch(bannerQuery);

//   return {
//     props: {products, bannerData}
//   }
// }
// export default page;