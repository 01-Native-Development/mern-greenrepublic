import React, {useState} from 'react';
import ProductCardsComponent from '../components/products/ProductCardsComponent.jsx';
import products from '../data/products.json';


export default function TrendingProductsSection() {
   const [visibleProducts, setVisibleProducts] = useState(8);

   const loadMoreProducts = () => {
      setVisibleProducts(preCount => preCount + 4);
   }


   return (
      <section className="section__container product__container">
         <h2 className='section__header'>Trending Products</h2>
         <p className='section__subheader font-semibold tracking-wider mb-12'>
         Explore the Latest Picks: Elevate Your Experience with Our Curated Collection of Premium Cannabis
          Products
         </p>
         {/*ProductCardsComponents*/}
         <div className="mt-12">
            <ProductCardsComponent products={products.slice(0, visibleProducts)} />
         </div>
         {/* load more products button */}
         <div className="product__btn">
            {
               visibleProducts < products.length && (
                  <button className='btn uppercase font-semibold tracking-wider' onClick={loadMoreProducts}>Load More</button>
               )
            }
         </div>
      </section>

   );
}