import {model, Schema} from 'mongoose';

const reviewSchema = new Schema({

      comment: { type: String, required: true },
      rating: { type: Number, required: true },
      userId: {
         type: Schema.Types.ObjectId,
         ref: 'User',
         required: true,
      },
      productId: {
         type: Schema.Types.ObjectId,
         ref: 'Product',
         required: true,
      },
   },
   { timestamps: true }

);

const Review = model('Review', reviewSchema);
export default Review;