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
                  <p className="font-body tracking-wider mt-4 text-gray-600 text-lg">Welcome to Green Republic, where nature meets innovation. We are passionate about delivering premium cannabis products that elevate your experience while promoting wellness and sustainability. At Green Republic, we believe in the power of cannabis to enhance lives, and we are committed to providing safe, high-quality products crafted with care and precision.

Our mission is to create a community where everyone can explore and enjoy the benefits of cannabis responsibly. Whether you're new to cannabis or a seasoned enthusiast, Green Republic is your trusted partner in discovering the finest strains, edibles, and more. Join us as we redefine the cannabis lifestyle—one that is rooted in trust, quality, and a greener future for all.</p>
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