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
                     Us</h2>
                  <p className="font-body tracking-wider mt-4 text-gray-600 text-lg">At Lebaba, our passion goes beyond just offering a curated selection of stylish clothing and accessories. We are dedicated to creating a community where women can express their unique identities. Our thoughtfully chosen collections feature timeless pieces, trendy finds, and exclusive lines that reflect the diversity of women everywhere. From chic everyday wear to stunning outfits for special occasions, we have something for every chapter of your life.</p>
                  <div className="mt-8">
                     <a href="/shop"
                        className="font-body tracking-wider about__info text-primary-dark hover:text-primary font-medium">Learn
                        more about us
                        <span className="ml-2">&#8594;</span></a>
                  </div>
               </div>
               <div className="mt-12 md:mt-0">
                  <img
                     src={aboutImage}
                     alt="About Us Image"
                     className="object-cover rounded-sm shadow-md"/>
               </div>
            </div>
         </div>
      </section>

   );
}