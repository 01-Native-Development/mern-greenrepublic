import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {useGetSingleProductQuery} from '../../redux/features/products/productAPI.js';
import {usePostReviewMutation} from '../../redux/features/reviews/reviewAPI.js';
import {useNotification} from '../../hooks/notificationHook.jsx';


export default function ReviewPostComponent({isModalOpen, handleClose}) {
   const [rating, setRating] = useState(0);
   const [comment, setComment] = useState('');

   const {productId} = useParams();
   const {user} = useSelector((state) => state.users);

   const {refetch} = useGetSingleProductQuery(productId, {skip: !productId});
   const [postReview] = usePostReviewMutation();
   const {updateNotification} = useNotification();


   const handleRating = (value) => {
      setRating(value);
   }


   const handleSubmit = async (e) => {
      e.preventDefault();
      const newComment = {
         comment: comment,
         rating: rating,
         userId: user?._id,
         productId: productId
      }

      try {
         const response =  await postReview(newComment).unwrap();
         updateNotification('success', 'Comment posted successfully!');
         setComment('');
         setRating(0);
         refetch();

      } catch(err) {
         const message = err.message;
         return updateNotification("error", message);

      }
      handleClose();
   }

   return (
      <div
         className={`fixed inset-0 bg-black/90 flex items-center justify-center z-40 px-2 ${isModalOpen ? 'block' : 'hidden'}`}>
         <div className='bg-white p-6 rounded-md shadow-lg w-5/12 z-50'>
            <h2 className='text-lg font-medium mb-4'>Write Review</h2>
            <div className='flex items-center mb-4'>
               {
                  [1, 2, 3, 4, 5].map((star, index) => (
                     <span
                        key={index}
                        onClick={() => handleRating(star)}
                        className='cursor-pointer text-yellow-500 text-xl'>
                            {
                               rating >= star ? (
                                  <i className="ri-star-fill"></i>) : (
                                  <i className="ri-star-line"></i>)
                            }
                    </span>
                  ))
               }
            </div>
            <textarea
               value={comment}
               onChange={(e) => setComment(e.target.value)}
               rows="4"
               className='w-full  border border-gray-300 p-2 rounded-md mb-4 focus:outline-none'
            ></textarea>
            <div className='flex justify-end gap-2'>
               <button
                  onClick={handleClose}
                  className='px-4 py-2 bg-gray-300 font-semibold uppercase rounded-md'>Cancel
               </button>
               <button
                  onClick={handleSubmit}
                  className='btn px-4 py-2 bg-primary font-semibold uppercase text-white rounded-md'>Submit
               </button>
            </div>

         </div>
      </div>

   );
}