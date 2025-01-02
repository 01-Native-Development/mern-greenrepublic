import React from 'react';

import cardImage1 from '../assets/card-1.png';
import cardImage2 from '../assets/card-2.png';
import cardImage3 from '../assets/card-3.png';


const cards = [
   {
      id: 1,
      image: cardImage1,
      trend: '2024 Trend',
      title: 'Women Blouses'
   },
   {
      id: 2,
      image: cardImage2,
      trend: '2024 Trend',
      title: 'Women Dresses'
   },
   {
      id: 3,
      image: cardImage3,
      trend: '2024 Trend',
      title: 'Women Casuals'
   }
]

export default function HeroSection() {

   return (
      <section className="section__container hero__container">
         {
            cards.map((card) => (
               <div key={card.id} className='hero__card'>
                  <img src={card.image} alt="trend image" />
                  <div className='hero__content'>
                     <p>{card.trend}</p>
                     <h4>{card.title}</h4>
                     <a href="#">Discover More</a>
                  </div>
               </div>
            ))
         }
      </section>

   );
}