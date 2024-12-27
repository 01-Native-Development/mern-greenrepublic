/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import bannerImage from '../../assets/header.png'; // Update the image to reflect your cannabis theme

export default function BannerComponent() {

   return (
      <div className='header__container section__container'>
         <div className='z-30 header__content'>
            <h4 className='font-semibold uppercase tracking-wider'>UP TO 20% Discount on</h4>
            <h1>Green Republic</h1>
            <p className="font-semibold tracking-wider">
               Elevate your lifestyle with premium cannabis products. Explore a curated collection of edibles, vapes, CBD, and cosmetics,
               crafted for wellness and enjoyment.
            </p>
            <button className='font-semibold tracking-wider btn'>
               <Link to='/shop'>EXPLORE NOW</Link>
            </button>
         </div>
         <div className='header__image'>
            <img src={bannerImage} alt="banner showcasing cannabis products" />
         </div>
      </div>
   );
}
