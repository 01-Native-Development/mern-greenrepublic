import React, {useEffect, useState} from 'react';

/*import productsData from '../data/products.json';*/
import ProductCardsComponent from '../components/products/ProductCardsComponent.jsx';
import ShopFilteringComponent from '../components/products/ShopFilteringComponent.jsx';

import {useGetAllProductsQuery} from './../redux/features/products/productAPI.js';


const filters = {
   categories: ['all', 'accessories', 'clothing', 'jewelry', 'cosmetics'],
   colors: ['all', 'beige', 'black', 'brown', 'blue', 'green', 'gold', 'red', 'grey', 'silver'],
   priceRanges: [
      {label: 'Under $50', min: 0, max: 50},
      {label: '$51 - $100', min: 51, max: 100},
      {label: '$101 - $200', min: 101, max: 200},
      {label: 'above $200', min: 201, max: Infinity}
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
         <section className="section__container bg-primary-light">
            <h2 className="section__header capitalize">Shop Page</h2>
            <p className="section__subheader">Discover the Hottest Picks: Elevate
               Your Natural with Our Curated Collection of Trending Cannibis
               Products.</p>
         </section>
         <section className="section__container">
            <div className="flex flex-col md:flex-row md:gap-12 gap-8">
               {/* left side */}
               <ShopFilteringComponent
                  filters={filters}
                  filtersState={filtersState}
                  setFiltersState={setFiltersState}
                  clearFilters={clearFilters}
               />
               {/* right side */}
               <div>
                  <h3 className="font-header text-xl font-semibold tracking-wider mb-4">
                     {/*{products.length} Available Products*/}
                     Showing {startProduct} to {endProduct} of {totalProducts} Products
                  </h3>
                  <ProductCardsComponent products={products}/>

                  {/* pagination controls */}
                  <div className='mt-6 flex justify-center'>
                     <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className='px-4 py-2 bg-gray-300 font-semibold capitalize text-gray-700 rounded-md mr-2'>Prev</button>

                     {
                        [...Array(totalPages)].map((_, index) => (
                           <button key={index}
                                   onClick={() => handlePageChange(index + 1)}
                                   className={`px-4 py-2 font-semibold ${currentPage === index + 1 ? 'btn' : 'btn-pagination bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-gray-100'}
                                        rounded-md mx-1
                                        `}
                           >{index + 1}</button>
                        ))
                     }

                     <button
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className='px-4 py-2 bg-gray-300 font-semibold capitalize text-gray-700 rounded-md ml-2'>next</button>

                  </div>

               </div>
            </div>
         </section>
      </>
   );
}