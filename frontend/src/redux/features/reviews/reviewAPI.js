import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getBaseURL} from '../../../utils/baseURLUtils.js';



const reviewAPI = createApi({
   reducerPath: 'reviewAPI',
   baseQuery: fetchBaseQuery({
      baseUrl: `${getBaseURL()}/api/v1.0/reviews`,
      credentials: 'include'
   }),
   tagTypes: ['Review'],
   endpoints: (builder) => ({
      postReview: builder.mutation({
         query: (reviewData) => ({
            url: '/post-review',
            method: 'POST',
            body: reviewData
         }),
         invalidatesTags: (result, error, {reviewId}) => [{type: "Review", id: reviewId}]
      }),
      getAllReviews: builder.query({
         query: () => ({
            url: '/all-reviews'
         })
      }),
      getUserReviews: builder.query({
         query: () => ({userId}) => ({
            url: `/${userId}`
         }),
         providesTags: (result) => result ? [{type: 'Review', id: result[0]?.email}] : []
      })
   })
});

export const {usePostReviewMutation, useGetAllReviewsQuery, useGetUserReviewsQuery} = reviewAPI;

export default reviewAPI;