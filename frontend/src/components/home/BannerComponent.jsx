import React from 'react';
import { Link } from 'react-router-dom';
import bannerImage from '../../assets/header.png';

export default function BannerComponent() {

   return (
      <div className='section__container header__container'>
         <div className='header__content z-30'>
            <h4 className='uppercase tracking-wider font-semibold'></h4>
            <h1>Green Republic</h1>
            <p className="font-semibold tracking-wider">Welcome to Green Republic, your trusted source for premium cannabis products crafted with care and precision.
                Discover a greener way to enhance your wellness and elevate your lifestyle responsibly.</p>
            <button className='btn font-semibold tracking-wider'><Link to='/shop'>EXPLORE NOW</Link></button>
         </div>
         <div className='header__image'>
            <img src={bannerImage} alt="banner image"/>
         </div>
      </div>

   );
}