/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';

/*import productsData from '../data/products.json';*/
import ProductCardsComponent from '../components/products/ProductCardsComponent.jsx';
import ShopFilteringComponent from '../components/products/ShopFilteringComponent.jsx';

import {useGetAllProductsQuery} from './../redux/features/products/productAPI.js';


const filters = {
   categories: ['all', 'edibles', 'vapes', 'cbd', 'cosmetics'],
   colors: ['all', 'beige oracle', 'black widow', 'brown beard', 'blue haze', 'green gold', 'gold lotus', 'red beard', 'grey widow', 'silver gorilla'],
   priceRanges: [
      {label: 'Under R100', min: 0, max: 100},
      {label: 'R151 - R300', min: 151, max: 300},
      {label: 'R301 - R800', min: 301, max: 800},
      {label: 'above R800', min: 801, max: Infinity}
   ]
};


export default function ShopPage() {
   const [filtersState, setFiltersState] = useState({
      category: 'all',
      color: 'all',
      priceRange: ''
   });

   const [currentPage, setCurrentPage] = useState(1);
   const [ProductsPerPage] = useState(8);

   const { category, color, priceRange } = filtersState;
   const [minPrice, maxPrice] = priceRange.split('-').map(Number);

   const { data: { products = [], totalPages, totalProducts } = {}, error, isLoading } = useGetAllProductsQuery({
      category: category !== 'all' ? category : '',
      color: color !== 'all' ? color : '',
      minPrice: isNaN(minPrice) ? '' : minPrice,
      maxPrice: isNaN(maxPrice) ? '' : maxPrice,
      page: currentPage,
      limit: ProductsPerPage
   });



   // const applyShoppingFilters = () => {
   //
   //    let filteredProducts = productsData;
   //
   //
   //    if (filtersState.category && filtersState.category !== 'all') {
   //       filteredProducts = filteredProducts.filter(product => product.category === filtersState.category);
   //    }
   //
   //    if (filtersState.color && filtersState.color !== 'all') {
   //       filteredProducts = filteredProducts.filter(product => product.color === filtersState.color);
   //    }
   //
   //    if (filtersState.priceRange) {
   //       const [minPrice, maxPrice] = filtersState.priceRange.split('-').map(Number);
   //       filteredProducts = filteredProducts.filter(product => product.price >= minPrice && product.price <= maxPrice);
   //
   //    }
   //
   //    setProducts(filteredProducts);
   //
   // }

   const clearFilters = () => {
      setFiltersState({
         category: 'all', color: 'all', priceRange: ''
      })
   }

   const handlePageChange = (pageNumber) => {
      if(pageNumber > 0 && pageNumber <= totalPages) {
         setCurrentPage(pageNumber)
      }
   }

   /*useEffect(() => {
      applyShoppingFilters();

   }, [filtersState]);*/


   if (isLoading) {
      return <div>Loading...</div>
   }
   if (error) {
      return <div>Error loading products.</div>
   }

   const startProduct = (currentPage - 1) * ProductsPerPage + 1;
   const endProduct = startProduct + products.length - 1;

   return (
      <>
         <section className="bg-primary-light section__container">
            <h2 className="capitalize section__header">Shop Page</h2>
            <p className="section__subheader">Discover the Hottest Picks: Elevate
               Your Natural with Our Curated Collection of Trending Cannibis
               Products.</p>
         </section>
         <section className="section__container">
            <div className="flex md:flex-row flex-col gap-8 md:gap-12">
               {/* left side */}
               <ShopFilteringComponent
                  filters={filters}
                  filtersState={filtersState}
                  setFiltersState={setFiltersState}
                  clearFilters={clearFilters}
               />
               {/* right side */}
               <div>
                  <h3 className="mb-4 font-header font-semibold text-xl tracking-wider">
                     {/*{products.length} Available Products*/}
                     Showing {startProduct} to {endProduct} of {totalProducts} Products
                  </h3>
                  <ProductCardsComponent products={products}/>

                  {/* pagination controls */}
                  <div className='flex justify-center mt-6'>
                     <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className='bg-gray-300 mr-2 px-4 py-2 rounded-md font-semibold text-gray-700 capitalize'>Prev</button>

                     {
                        [...Array(totalPages)].map((_, index) => (
                           <button key={index}
                                   onClick={() => handlePageChange(index + 1)}
                                   className={`px-4 py-2 font-semibold R{currentPage === index + 1 ? 'btn' : 'btn-pagination bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-gray-100'}
                                        rounded-md mx-1
                                        `}
                           >{index + 1}</button>
                        ))
                     }

                     <button
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className='bg-gray-300 ml-2 px-4 py-2 rounded-md font-semibold text-gray-700 capitalize'>next</button>

                  </div>

               </div>
            </div>
         </section>
      </>
   );
}