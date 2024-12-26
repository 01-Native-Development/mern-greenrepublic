import React from 'react';
import aboutImage from '../assets/about-us.jpg';

export default function AboutPage() {

   return (
      <section className="section__container bg-gray-100">
         <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
               <div className="max-w-lg">
                  <h2
                     className="font-header text-3xl font-extrabold text-gray-900 sm:text-4xl">About
                     The Green Republic</h2>
                  <p className="font-body tracking-wider mt-4 text-gray-600 text-lg">At The Green Republic, our mission is to redefine wellness by providing high-quality cannabis products. From edibles and vapes to CBD oils and cosmetics, we are dedicated to empowering your lifestyle with safe, sustainable, and innovative solutions. Whether you’re seeking relaxation, inspiration, or natural beauty enhancements, our thoughtfully selected range caters to every preference.</p>
                  <div className="mt-8">
                     <a href="/shop"
                        className="font-body tracking-wider about__info text-primary-dark hover:text-primary font-medium">Discover
                        Our Collection
                        <span className="ml-2">&#8594;</span></a>
                  </div>
               </div>
               <div className="mt-12 md:mt-0">
                  <img
                     src={aboutImage}
                     alt="About The Green Republic"
                     className="object-cover rounded-sm shadow-md"/>
               </div>
            </div>
         </div>
      </section>

   );
}
