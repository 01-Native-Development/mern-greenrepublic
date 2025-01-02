import express from 'express';
import {createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct,
   getRelatedProducts} from '../controllers/productControllers.js';
import {verifyToken} from './../middlewares/verifyTokenMiddleware.js';
import {verifyAdmin} from './../middlewares/verifyAdminMiddleware.js';

const router = express.Router();

router.post('/create-product',verifyToken, verifyAdmin, createProduct);
router.get('/', getAllProducts);
router.get('/:id', getSingleProduct);
router.get('/related-products/:id', getRelatedProducts);
router.delete('/:id', verifyToken, verifyAdmin, deleteProduct);
router.patch('/update-product/:id', verifyToken, verifyAdmin, updateProduct);

export default router;