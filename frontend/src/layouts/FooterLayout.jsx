import React from 'react';

import instagramImage1 from '../assets/instagram-1.jpg';
import instagramImage2 from '../assets/instagram-2.jpg';
import instagramImage3 from '../assets/instagram-3.jpg';
import instagramImage4 from '../assets/instagram-4.jpg';
import instagramImage5 from '../assets/instagram-5.jpg';


export default function FooterLayout() {

   return (
      <>
         <footer className='section__container footer__container'>
            <div className="footer__col">
               <h4>CONTACT INFO</h4>
               <div>
                  <a href="https://www.google.com/maps/place/1234+Green+Lane,+Cannabis+City,+Green+State" target="_blank" rel='noreferrer'>
                     <span><i className="ri-map-pin-2-fill"></i></span>
                     Block 5 Fountain Grove,
                     <div className="text-black tracking-wider">2nd Road , Hyde Park , Sandton</div>
                  </a>
               </div>
               <p>
                  <a href="mailto:support@thegreenrepublic.com" target="_blank" className="">
                     <span><i className="ri-mail-fill"></i></span>support@thegreenrepublic.com
                  </a>
               </p>
               <p>
                  <a href="tel: 123-456-7890">
                     <span><i className="ri-phone-fill"></i></span>(+27) 150-4628
                  </a>
               </p>
            </div>

            <div className="footer__col">
               <h4>COMPANY</h4>
               <a href="/">Home</a>
               <a href="/about">About Us</a>
               <a href="/">Careers With Us</a>
               <a href="/">Our Blogs</a>
               <a href="/terms-condition">Terms & Conditions</a>
            </div>

            <div className='footer__col'>
               <h4>USEFUL LINKS</h4>
               <a href="/">Track Orders</a>
               <a href="/categories/edibles">Edibles</a>
               <a href="/categories/vapes">Vapes</a>
               <a href="/categories/cbd">CBD</a>
               <a href="/categories/cosmetics">Cosmetics</a>
            </div>

            <div className='footer__col'>
               <h4>INSTAGRAM</h4>
               <div className='instagram__grid'>
                  <img src={instagramImage1} alt="cannabis product" />
                  <img src={instagramImage2} alt="cannabis lifestyle" />
                  <img src={instagramImage3} alt="cannabis product" />
                  <img src={instagramImage4} alt="cannabis product" />
                  <img src={instagramImage5} alt="cannabis event" />
               
               </div>
            </div>
         </footer>

         <div className='footer__bar tracking-wider bg-neutral-100'>
            © 2024 by The Green Republic, Inc. All rights reserved.
         </div>
      </>
   );
}
