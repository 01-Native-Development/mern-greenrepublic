import React from 'react'
import { Link, useParams } from 'react-router-dom';
import RatingStarsComponent from './RatingStarsComponent.jsx';
import {useDispatch} from 'react-redux';
import {addToCart} from '../../redux/features/cart/cartSlice.js';
import {useGetSingleProductQuery} from '../../redux/features/products/productAPI.js';
import ReviewCardComponent from '../reviews/ReviewCardComponent.jsx';

export default function SingleProductComponent() {
   /*const params = useParams();*/
   /*const {id} = useParams();*/
   /*const productId = params.productId;*/

   const {productId} = useParams();
   const dispatch = useDispatch();

   const {data, error, isLoading} = useGetSingleProductQuery(productId);

   const singleProduct = data?.product || {};
   const productReviews = data?.reviews || [];


   const handleAddToCart = (product) => {
      dispatch(addToCart(product))
   }

   if(isLoading) {
      return <p>Loading...</p>
   }

   if(error) {
      return <p>Error loading product details.</p>
   }

   return (
      <>
         <section className='section__container bg-primary-light'>
            <h2 className='section__header capitalize'>Single Product Page</h2>
            <div className='section__subheader space-x-2 font-semibold tracking-wider'>
               <span className='hover:text-primary'><Link className='capitalize'
                                                          to="/">home</Link></span>
               <i className="ri-arrow-right-s-line"></i>
               <span className='hover:text-primary'><Link className='capitalize'
                                                          to="/shop">shop</Link></span>
               <i className="ri-arrow-right-s-line"></i>
               <span className='hover:text-primary'>{singleProduct.name}</span>
            </div>
         </section>
         <section className='section__container mt-8'>
            <div className='flex flex-col items-center md:flex-row gap-8'>
               {/* product image */}
               <div className='md:w-1/2 w-full'>
                  <img src={singleProduct?.image} alt="product image"
                       className='rounded-md w-full h-auto'
                  />
               </div>


               <div className="md:w-1/2 w-full">
                  <h3
                     className="text-2xl font-semibold mb-4">{singleProduct?.name}</h3>
                  <p className="text-xl text-black font-semibold mb-4 space-x-1">
                     {singleProduct?.oldPrice &&
                        <s className="ml-1 text-primary">${singleProduct?.oldPrice}</s>}
                        &nbsp;
                     ${singleProduct?.price}
                  </p>
                  <p className="text-gray-900 tracking-wider mb-4">{singleProduct?.description}</p>

                  {/* additional product info */}
                  <div className="flex flex-col space-y-2">
                     <p className="capitalize"><strong>Category:</strong> {singleProduct?.category}</p>
                     <p className="capitalize"><strong>Color:</strong> {singleProduct?.color}</p>
                     <div className="flex gap-1 items-center">
                        <strong>Rating: </strong>
                        <RatingStarsComponent rating={singleProduct?.rating}/>
                     </div>

                  </div>

                  <button
                     onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(singleProduct)
                     }}
                     className="btn mt-6 px-6 py-3 uppercase font-semibold rounded-md">
                     Add to Cart
                  </button>
               </div>
            </div>
         </section>
         {/* display Reviews */}
         <section className='section__container mt-8'>
            <ReviewCardComponent productReviews={productReviews} />
         </section>
      </>

   );
}