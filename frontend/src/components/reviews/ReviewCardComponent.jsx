import React, {useState} from 'react';
import {formatDate} from '../../utils/functionUtils.js';
import RatingStarsComponent from '../products/RatingStarsComponent.jsx';
import avatar from '../../assets/avatar.png'
import ReviewPostComponent from './ReviewPostComponent.jsx';


export default function ReviewCardComponent({productReviews}) {
   const [isModalOpen, setIsModalOpen] = useState(false);

   const reviews = productReviews || [];

   const handleOpenReviewModal = () => {
      setIsModalOpen(true);
   }

   const handleCloseReviewModal = () => {
      setIsModalOpen(false);
   }
   console.log(reviews)
   return (
      <div className='my-6  bg-white p-8'>
         {
            reviews.length > 0 ?  (<div>
               <h3 className='text-lg font-medium'>Product Reviews</h3>
               <div>
                  {
                     reviews.map((review, index) => (
                        <div key={index} className='mt-4'>
                           <div className='flex gap-4  items-center'>
                              <img src={avatar} alt="avator" className='size-14' />
                              <div className='space-y-1'>
                                 <p className='text-lg font-medium underline capitalize underline-offset-4 text-black'>{review?.userId?.username}</p>
                                 <p className='text-[16px] italic'>{formatDate(review?.updatedAt)}</p>
                                 <RatingStarsComponent rating={review?.rating} />
                              </div>
                           </div>
                           <div className='text-gray-600 mt-5  border p-8'>
                              <p className='md:w-4/5'>{review?.comment}</p>
                           </div>
                        </div>
                     ))
                  }
               </div>
            </div>) : (<div>no reviews</div>)
         }
         {/* add review button */}
         <div className='mt-12'>
            <button
               onClick={handleOpenReviewModal}
               className=' btn px-6 py-3 bg-primary font-semibold uppercase text-white rounded-md'>Add Review</button>
         </div>
         {/* review modal  */}
         <ReviewPostComponent isModalOpen={isModalOpen} handleClose={handleCloseReviewModal}/>
      </div>

   );
}