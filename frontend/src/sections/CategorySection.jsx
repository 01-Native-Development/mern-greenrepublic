/* eslint-disable no-unused-vars */
import React from 'react';
import {Link} from 'react-router-dom';

import categoryImage1 from '../assets/category-1.jpg';
import categoryImage2 from '../assets/category-2.jpg';
import categoryImage3 from '../assets/category-3.jpg';
import categoryImage4 from '../assets/category-4.jpg';

export default function CategorySection() {

   const categories = [
      {name: 'Edibles', path: 'edibles', image: categoryImage1},
      {name: 'Vape', path: 'vape', image: categoryImage2},
      {name: 'Cbd', path: 'cbd', image: categoryImage3},
      {name: 'Cosmetics', path: 'cosmetics', image: categoryImage4}
   ];

   const handleImageError = (e) => {
      e.target.src = 'https://via.placeholder.com/150'; // Fallback placeholder image
   };

   return (
      <div className="product__grid">
         {categories.map(category => (
            <Link 
               className="categories__card" 
               key={category.name} 
               to={`/categories/${category.path}`} 
               aria-label={`View products in ${category.name}`}
            >
               <img src={category.image} alt={category.name} onError={handleImageError} />
               <h4>{category.name}</h4>
            </Link>
         ))}
      </div>
   );
}
