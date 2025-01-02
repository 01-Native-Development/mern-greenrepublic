import React from 'react';
import { Link } from 'react-router-dom';
import bannerImage from '../../assets/header.png';

export default function BannerComponent() {

   return (
      <div className='section__container header__container'>
         <div className='header__content z-30'>
            <h4 className='uppercase tracking-wider font-semibold'>UP TO 20% Discount on</h4>
            <h1>Women's Fashion</h1>
            <p className="font-semibold tracking-wider">Elevate your wardrobe with our fashions crafted with high-quality materials. Explore a curated collection of clothing,
               accessories, and footwear that caters to every taste and occasion.</p>
            <button className='btn font-semibold tracking-wider'><Link to='/shop'>EXPLORE NOW</Link></button>
         </div>
         <div className='header__image'>
            <img src={bannerImage} alt="banner image"/>
         </div>
      </div>

   );
}