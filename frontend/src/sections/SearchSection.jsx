import React, {useState} from 'react';

import productsData from '../data/products.json';
import ProductCardsComponent from '../components/products/ProductCardsComponent.jsx';



export default function SearchSection() {
   const [filteredProducts, setFilteredProducts] = useState(productsData);
   const [searchQuery, setSearchQuery] = useState('');

   const handleChange = (e) => {
      setSearchQuery(e.target.value);
   }

   const handleSearch = () => {
      const query = searchQuery.toLowerCase();
      const filteredProducts = productsData.filter(product => product.name.toLowerCase().includes(query)
         || product.description.toLowerCase().includes(query) || product.category.toLowerCase().includes(query)
         || product.subCategory.toLowerCase().includes(query) || product.color.toLowerCase().includes(query));

      setFilteredProducts(filteredProducts);
   }

   return (
      <>
         <section className='section__container bg-primary-light'>
            <h2 className='section__header capitalize'>Search Products</h2>
            <p className='section__subheader'>Browse a diverse range of categories,
               from chic dresses to versatile accessories. Elevate your style
               today!</p>
         </section>
         <section className='section__container'>
            <div
               className='w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-2'>
               <input type="text"
                      value={searchQuery}
                      onChange={handleChange}
                      className='search-bar w-full max-w-4xl p-2 border rounded tracking-wider'
                      placeholder='Search here. . .'/>

               <button
                  onClick={handleSearch}
                  className='search-button w-full md:w-auto font-semibold uppercase rounded tracking-wider'>Search
               </button>
            </div>
            <ProductCardsComponent products={filteredProducts} />
         </section>
      </>

   );
}