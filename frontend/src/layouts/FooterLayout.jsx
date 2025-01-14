import React from 'react';

import instagramImage1 from '../assets/instagram-1.jpg';
import instagramImage2 from '../assets/instagram-2.jpg';
import instagramImage3 from '../assets/instagram-3.jpg';
import instagramImage4 from '../assets/instagram-4.jpg';
import instagramImage5 from '../assets/instagram-5.jpg';
import instagramImage6 from '../assets/instagram-6.jpg';

export default function FooterLayout() {

   return (
      <>
         <footer className='section__container footer__container'>
            <div className="footer__col">
               <h4>CONTACT INFO</h4>
               <div>
                  <a href="https://www.google.com/maps/place/1234+Park+Ave,+New+York,+NY+10128/@40.7864709,-73.9555135,16z/data=!3m1!4b1!4m6!3m5!1s0x89c258a6b777b2bb:0xccc4bafb3a956499!8m2!3d40.7864669!4d-73.9529386!16s%2Fg%2F11cs8m3msb?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D" target="_blank"
                     rel='noreferrer'>
                  <span><i className="ri-map-pin-2-fill"></i></span>
                  Block 5 Fountain Grove , 5 2nd Road
                  <div className="text-black tracking-wider">Hyde Park, Sandton</div></a>
               </div>
               <p>
                  <a href="tel: 901-828-4631"><span><i className="ri-phone-fill"></i></span>(+27)87 150 4628 </a>
               </p>
            </div>

            <div className="footer__col">
               <h4>COMPANY</h4>
               <a href="/">Home</a>
               <a href="/about">About Us</a>
               <a href="/">Shop</a>
               <a href="/">Our Blogs</a>
               <a href="/terms-condition">Terms & Condition</a>
            </div>

            <div className='footer__col'>
               <h4>USEFUL LINK</h4>
               <a href="/">Track Orders</a>
               <a href="/categories/accessories">Edibles</a>
               <a href="/categories/clothing">Vapes</a>
               <a href="/categories/jewelry">Rolls</a>
               <a href="/categories/cosmetics">Cosmetics</a>
            </div>
            <div className='footer__col'>
               <h4>INSTAGRAM</h4>
               <div className='instagram__grid'>
                  <img src={instagramImage1} alt="instagram image" />
                  <img src={instagramImage2} alt="instagram image" />
                  <img src={instagramImage3} alt="instagram image" />
                  <img src={instagramImage4} alt="instagram image" />
                  <img src={instagramImage5} alt="instagram image" />
                  <img src={instagramImage6} alt="instagram image" />
               </div>
            </div>
         </footer>

         <div className='footer__bar tracking-wider bg-neutral-100'>
            © 2025 by Green Republic,Inc. All rights reserved.
         </div>
      </>

   );
}