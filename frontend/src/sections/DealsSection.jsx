/* eslint-disable no-unused-vars */
import React from 'react';
import dealsImage from '../assets/deals.png';

export default function DealsSection() {

   return (
      <section className='deals__container section__container'>
         <div className='deals__image'>
            <img src={dealsImage} alt="CBD products deals"/>
         </div>

         <div className='deals__content'>
            <h5 className="font-semibold tracking-wider">Get Up To 20% Discount</h5>
            <h4>CBD Deals Of This Month</h4>
            <p className="font-semibold tracking-wider">Explore this month&lsquo;s exclusive CBD deals, featuring edibles, vapes, and more. Enjoy up to 20% off premium products designed to enhance your wellness routine.</p>
            <div className='flex-wrap deals__countdown'>
               <div className='deals__countdown__card'>
                  <h4>14</h4>
                  <p>Days</p>
               </div>
               <div className='deals__countdown__card'>
                  <h4>20</h4>
                  <p>Hours</p>
               </div>
               <div className='deals__countdown__card'>
                  <h4>15</h4>
                  <p>Mins</p>
               </div>
               <div className='deals__countdown__card'>
                  <h4>05</h4>
                  <p>Secs</p>
               </div>
            </div>
         </div>
      </section>
   );
}
