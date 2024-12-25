import express from 'express';
import {createCheckoutSession, confirmPayment, deleteOrder,
getAllOrders, getOrdersByEmail, getOrdersById, updateOrder} from '../controllers/orderControllers.js';
import {verifyToken} from './../middlewares/verifyTokenMiddleware.js';
import {verifyAdmin} from './../middlewares/verifyAdminMiddleware.js';


const router = express.Router();

router.post('/create-checkout-session', createCheckoutSession);
router.post('/confirm-payment', confirmPayment);
router.get('/', getAllOrders);
router.get('/:email', getOrdersByEmail);
router.get('/get-orders/:orderId', getOrdersById);
router.patch('/update-order/:orderId', updateOrder);
router.delete('/delete-order/:orderId', deleteOrder);

export default router;