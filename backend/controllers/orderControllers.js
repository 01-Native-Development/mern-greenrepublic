import Order from './../models/orderModel.js';
import verifyTokenMiddleware from '../middlewares/verifyTokenMiddleware.js';
import verifyAdminMiddleware from '../middlewares/verifyAdminMiddleware.js';
import {messageHandler} from '../utils/messageHandlerUtils.js';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const createCheckoutSession = async (req, res) => {
   const {products} = req.body;

   try {
      const lineItems = products.map((product) => ({
         price_data: {
            currency: "usd",
            product_data: {
               name: product.name,
               images: [product.image],
            },
            unit_amount: Math.round(product.price * 100),
         },
         quantity: product.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
         payment_method_types: ["card"],
         line_items: lineItems,
         mode: "payment",
         success_url:
            `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
         cancel_url: `http://localhost:5173/cancel`,
      });
      res.json({ id: session.id });
   } catch(err) {
      console.log('error creating checkout session', err.message);
      messageHandler(res, 'Error creating checkout session', false, 500);
   }

}//end of createCheckoutSession Function

export const confirmPayment = async (req, res) => {
   const {session_id} = req.body;

   try {
      const session = await stripe.checkout.sessions.retrieve(session_id, {
         expand: ['line_items', 'payment_intent'],
      });

      const paymentIntentId = session.payment_intent.id;

      let order = await Order.findOne({ orderId: paymentIntentId });

      if (!order) {
         const lineItems = session.line_items.data.map((item) => ({
            productId: item.price.product,
            quantity: item.quantity,
         }));

         const amount = session.amount_total / 100;

         order = new Order({
            orderId: paymentIntentId,
            products: lineItems,
            amount: amount,
            email: session.customer_details.email,
            status:
               session.payment_intent.status === 'succeeded' ? 'pending' : 'failed',
         });
      } else {
         order.status =
            session.payment_intent.status === 'succeeded' ? 'pending' : 'failed';
      }

      await order.save();

      res.status(200).send({
         message: 'Payment was successfully confirmed!',
         order,

      });
   } catch(err) {
      console.log('error confirming payment', err.message);
      messageHandler(res, 'Error confirming payment!', false, 500);
   }

}//end of confirmPayment Function

export const getAllOrders = async (req, res) => {

   res.status(200).send({
      message: 'Received all orders',
   })
}//end of getAllOrders Function

export const getOrdersByEmail = async (req, res) => {

   res.status(200).send({
      message: 'Received orders by the email',
   })
}//end of getOrdersByEmail Function

export const getOrdersById = async (req, res) => {
   res.status(200).send({
      message: 'Received orders by Id',
   })
}//end of getOrderById Function

export const updateOrder = async (req, res) => {
   res.status(200).send({
      message: 'order updated by Id',
   })
}//end of updateOrder Function

export const deleteOrder = async (req, res) => {
   res.status(200).send({
      message: 'order deleted by Id',
   })
}//end of deleteOrder Function