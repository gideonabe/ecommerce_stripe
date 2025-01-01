import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'
// import {images} from '../constants'
import headphone from '../public/assets/headphone.webp';

const FooterBanner = ({ footerBanner: { discount, largeText1, largeText2, saleTime, smallText, midText, product, buttonText, image, desc } }) => {
  // doing this means i've destructured the elements i need out of the footerBanner
  return (
    <div className='footer-banner-container'>
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          {/* <p>{ desc}</p> */}
          <p>Best headphone on the market</p>
          <Link href={`/product/${product}`}>
            <button type='button'>{buttonText}</button>
          </Link>
        </div>

        {/* <img src={urlFor(image).url()} className='footer-banner-image' alt="" style={{width: 600, height: 600}}/> */}
        <img src="/assets/headphone.webp" alt="" className='footer-banner-image'/>
      </div>
    </div>
  )
}

export default FooterBanner