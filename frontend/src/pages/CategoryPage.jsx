import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import productsData from '../data/products.json';
import ProductCardsComponent from '../components/products/ProductCardsComponent.jsx';

export default function CategoryPage() {
   const [filteredProducts, setFilteredProducts] = useState([]);
   const { category } = useParams();

   useEffect(() => {
      const filteredData = productsData.filter(product => product.category === category.toLowerCase());
      setFilteredProducts(filteredData);

   }, [category]);

   useEffect(() => {
      window.scrollTo(0, 0);
   });

   return (
      <>
         <section className='section__container bg-primary-light'>
            <h2 className='section__header capitalize'>{category}</h2>
            <p className='section__subheader'>Explore premium products in the {category} category. From top-quality edibles to innovative CBD solutions, find the perfect fit for your needs today!</p>
         </section>
         {/* Product Cards */}
         <section className="section__container">
            <ProductCardsComponent products={filteredProducts} />
         </section>
      </>
   );
}
