import Product from './../models/productModel.js';
import Review from '../models/reviewModel.js';
import {messageHandler} from '../utils/messageHandlerUtils.js';


export const createProduct = async (req, res) => {
   try {
      const newProduct = new Product({...req.body});
      const savedProduct = await newProduct.save();

      /************************* calculate reviews *************************/
      const reviews = await Review.find({ productId: savedProduct._id });
      if (reviews.length > 0) {
         const totalRating = reviews.reduce(
            (acc, review) => acc + review.rating, 0);
         savedProduct.rating = totalRating / reviews.length;
         await savedProduct.save();
      }

      res.status(201).send({
         success: true,
         message: 'Product created!',
         product: savedProduct
      });


   } catch(err) {
      console.log('error creating product', err.message);
      messageHandler(res, 'Error creating product', false, 500);

   }
}//end of createProduct Function

export const updateProduct = async (req, res) => {
   try {
      const productId = req.params.id;
      const updatedProduct = await Product.findByIdAndUpdate(productId, {...req.body}, {new: true});

      if (!updatedProduct) {
         return messageHandler(res, 'Product not found!', false, 404);
      }

      res.status(200).send({
         success: true,
         message: 'Product succussfully updated!',
         product: updatedProduct
      });

   } catch(err) {
      console.error("Error updating product: ", err.message);
      return messageHandler(res, 'Error updating product', false, 500);
   }
}//end of updateProduct Function

export const deleteProduct = async (req, res) => {
   try {
      const productId = req.params.id;

      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (!deletedProduct) {
         return messageHandler(res, 'Product not found!', false, 404);
      }

      await Review.deleteMany({productId: productId});

      res.status(200).send({
         success: true,
         message: 'Product succesfully deleted!'
      })

   } catch(err) {
      console.error('Error deleting product!', err.message);
      return messageHandler(res, 'Error deleting product!', false, 500);
   }

}//end of deleteProduct Function

export const getSingleProduct = async (req, res) => {
  try {

     const productId = req.params.id;

      const singleProduct = await Product.findById(productId).populate("author", "email username");

      if (!singleProduct) {
         return messageHandler(res, 'Product not found!', false, 404);
      }

      const reviews = await Review.find({productId}).populate("userId", "username email username");

      res.status(200).send({success: true, message: 'Product successfully found!', product: singleProduct,
         reviews: reviews});

  } catch(err) {
   console.error("Error fetching single product", err.message);
   return messageHandler(res, 'Error fetching single product', false, 500);
  }
}//end of getSingleProduct Function

export const getAllProducts = async (req, res) => {
   try {
      const {
         category,
         color,
         minPrice,
         maxPrice,
         page = 1,
         limit = 10,
         subCategory
      } = req.query;

      const filter = {};

      if (category && category !== "all") {
         filter.category = category;
      }

      if (color && color !== "all") {
         filter.color = color;
      }

      if (minPrice && maxPrice) {
         const min = parseFloat(minPrice);
         const max = parseFloat(maxPrice);
         if (!isNaN(min) && !isNaN(max)) {
            filter.price = { $gte: min, $lte: max };
         }
      }
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const totalProducts = await Product.countDocuments(filter);
      const totalPages = Math.ceil(totalProducts / parseInt(limit));

      const products = await Product.find(filter)
         .skip(skip)
         .limit(parseInt(limit))
         .populate("author", "email")
         .sort({ createdAt: -1 });

      res.status(200).send({
         success: true,
         message: 'Products found successfully!',
         products: products,
         totalPages: totalPages,
         totalProducts: totalProducts
      });

   } catch(err) {
      console.log('Error getting all products...', err.message);
      messageHandler(res, 'Error getting all products.', false, 500);
   }
}//end of getAllProducts Function

export const getRelatedProducts = async (req, res) => {
   try {
      const { id } = req.params;
      if (!id) {
         return messageHandler(res, 'Product ID is required!', false, 400);
      }

      const product = await Product.findById(id);
      if (!product) {
         return messageHandler(res, 'Product not found!', false, 404);
      }

      const titleRegex = new RegExp(
         product.name
            .split(" ")
            .filter((word) => word.length > 1)
            .join("|"),
         "i"
      );

      const relatedProducts = await Product.find({
         _id: { $ne: id }, // Exclude the current product
         $or: [
            { name: { $regex: titleRegex } }, // Match similar names
            { category: product.category }, // Match the same category
            { subCategory: product.subCategory} //Match the same subCategory
         ],
      });

      res.status(200).send({
         success: true,
         message: 'Succesfully fetching related products!',
         products: relatedProducts
      })

   } catch(err) {
      console.error('Error fetching related products!', err.message);
      return messageHandler(res, 'Error fetching related products!', false, 500);
   }
}//end of getRelatedProducts Function