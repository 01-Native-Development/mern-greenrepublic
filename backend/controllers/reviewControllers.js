import Review from '../models/reviewModel.js';
import Product from '../models/productModel.js';
import {messageHandler} from '../utils/messageHandlerUtils.js';


export const postReview = async (req, res) => {

   try {
      const { comment, rating, productId, userId } = req.body;

      if (!comment) {
         return messageHandler(res, 'Comment is required!', false, 400);
      }
      if (!rating) {
         return messageHandler(res, 'Rating is required!', false, 400);
      }
      if (!productId) {
         return messageHandler(res, 'Product identification is required!', false, 400);
      }
      if (!userId) {
         return messageHandler(res, 'User identification is required!', false, 400);
      }

      const existingReview = await Review.findOne({ productId, userId });

      if (existingReview) {
         /************************* update review *************************/
         existingReview.comment = comment;
         existingReview.rating = rating;
         await existingReview.save();

      } else {
         /************************* create review *************************/
         const newReview = new Review({
            comment,
            rating,
            productId,
            userId,
         });
         await newReview.save();

      }
      /************************* calculate average  *************************/
      const reviews = await Review.find({ productId });
      if (reviews.length > 0) {
         const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
         const averageRating = totalRating / reviews.length;

         const product = await Product.findById(productId);
         if (product) {
            product.rating = averageRating;
            await product.save({ validateBeforeSave: false });

         } else {
            return messageHandler(res, 'Product not found!', false, 404);

         }
      }

      res.status(201).send({
         success: true,
         message: 'Review created successfully.',
         reviews: reviews
      });

   } catch(err) {
      console.log('Error creating review', err.message);
      return messageHandler(res, `Error creating review: ${err.message}`, false, 500);
   }

}//end of createReview Function

export const getAllReviews = async (req, res) => {
   try {
      const totalReviews = await Review.find({});
      const reviewsCount =  await Review.countDocuments({});

      res.status(200).send({
         success: true,
         message: 'All reviews retrieved successfully.',
         totalReviews,
         reviewsCount
      });

   } catch(err) {
      console.log('Error retrieving all reviews: ', err.message);
      return messageHandler(res, `Error retrieving all reviews: ${err.message}`, false, 500);
   }

}//end of getAllReviews Function


export const getUserReviews = async (req, res) => {
   const {userId} = req.params;
   if (!userId) {
      return messageHandler(res, 'User identification is required!', 400);
   }
   try {
      const reviews = await Review.find({ userId: userId }).sort({ createdAt: -1 });

      if(reviews.length === 0) {
         return messageHandler(res, 'No user reviews found!', false, 404);
      }

      res.status(200).send({
         success: true,
         message: 'User reviews retrieved successfully.',
         reviews: reviews
      })

   } catch(err) {
      console.log('Error creating review: ', err.message);
      return messageHandler(res, `Error creating review: ${err.message}`, false, 500);
   }

}//end of getUserReviews Function