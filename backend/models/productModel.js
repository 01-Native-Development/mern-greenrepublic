import {model, Schema} from 'mongoose';


const productSchema = new Schema({
   name: { type: String, required: true },
   category: {
      type: String,
      required: [true, 'Please select the category for this product!'],
      trim: true,
      enum: {
         values: ['accessories', 'cosmetics', 'clothing', 'jewelry'],
         message: 'Please select the correct category for the product!'
      }
   },
   subCategory: {
     type: String,
     trim: true,
   },
   description: { type: String, required: true, trim: true },
   price: { type: Number, required: true },
   oldPrice: { type: Number },
   image: { type: String, required: true },
   color: { type: String },
   rating: { type: Number, default: 0 },
   author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
   },
   { timestamps: true}
);

const Product = model('Product', productSchema);
export default Product;