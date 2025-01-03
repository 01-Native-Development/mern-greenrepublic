import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import productsData from '../data/products.json';
import ProductCardsComponent from '../components/products/ProductCardsComponent.jsx';


export default function CategoryPage() {
   const [filteredProducts, setFilteredProducts] = useState([]);
   const {category} = useParams();

   useEffect(() => {
      const filteredData = productsData.filter(product => product.category === category.toLowerCase());
      setFilteredProducts(filteredData);

   }, [category]);

   useEffect(() => {
      window.scrollTo(0, 0)
   });

   return (
      <>
         <section className='section__container bg-primary-light'>
            <h2 className='section__header capitalize'>{category}</h2>
            <p className='section__subheader'>Explore a wide selection of premium cannabis products, from top-quality strains to innovative edibles. Elevate your experience with Green Republic today!</p>
         </section>
         {/*product card*/}
         <section className="section__container">
            <ProductCardsComponent products={filteredProducts} />
         </section>
      </>
   );
}