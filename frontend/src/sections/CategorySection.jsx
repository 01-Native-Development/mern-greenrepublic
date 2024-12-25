import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';

import categoryImage1 from '../assets/category-1.jpg';
import categoryImage2 from '../assets/category-2.jpg';
import categoryImage3 from '../assets/category-3.jpg';
import categoryImage4 from '../assets/category-4.jpg';

export default function CategorySection() {

   const categories = [
      {name: 'Accessories', path: 'accessories', image: categoryImage1},
      {name: 'Clothing', path: 'clothing', image: categoryImage2},
      {name: 'Jewelry', path: 'jewelry', image: categoryImage3},
      {name: 'Cosmetics', path: 'cosmetics', image: categoryImage4}
   ]

   return (
      <>
         <div className="product__grid">
            {categories.map(category => (
               <Link className="categories__card" key={category.name} to={`/categories/${category.path}`}>
                  <img src={category.image} alt={category.name} />
                  <h4>{category.name}</h4>
               </Link>
            ))}
         </div>
      </>

   );
}