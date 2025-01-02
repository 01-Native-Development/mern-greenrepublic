// orders.routes.js
const express = require('express');
const crypto = require('crypto');
const querystring = require('querystring');
const axios = require('axios');
const router = express.Router();

const Order = require('./orders.model');

// Create payment session
router.post('/create-payment', async (req, res) => {
    const { products, return_url, cancel_url, notify_url, email } = req.body;

    try {
        // Calculate total amount
        const amount = products.reduce((sum, product) => sum + product.price * product.quantity, 0).toFixed(2);

        // PayFast credentials
        const merchantId = 'YOUR_MERCHANT_ID';
        const merchantKey = 'YOUR_MERCHANT_KEY';
        const passphrase = 'YOUR_PASSPHRASE'; // Optional

        // Construct payment data
        const paymentData = {
            merchant_id: merchantId,
            merchant_key: merchantKey,
            amount,
            item_name: 'Order from Green Republic',
            email_confirmation: '1',
            email_address: email,
            return_url,
            cancel_url,
            notify_url,
        };

        // Add passphrase for signature if applicable
        const signatureString = querystring.stringify(paymentData) + (passphrase ? `&passphrase=${passphrase}` : '');
        const signature = crypto.createHash('md5').update(signatureString).digest('hex');

        // Include the signature in payment data
        paymentData['signature'] = signature;

        // Pre-save order details in the database
        const order = new Order({
            orderId: null, // Will be updated after IPN
            products,
            amount: parseFloat(amount),
            email,
            status: 'pending',
        });
        await order.save();

        // Send payment URL to the client
        const paymentUrl = `https://www.payfast.co.za/eng/process?${querystring.stringify(paymentData)}`;
        res.json({ paymentUrl });
    } catch (error) {
        console.error('Error creating payment session:', error);
        res.status(500).json({ error: 'Failed to create payment session' });
    }
});

// Confirm payment (via IPN)
router.post('/confirm-payment', async (req, res) => {
    try {
        // PayFast IPN verification
        const ipnData = req.body;
        const verificationUrl = 'https://www.payfast.co.za/eng/query/validate';

        const response = await axios.post(verificationUrl, querystring.stringify(ipnData));
        if (response.data === 'VALID') {
            const { pf_payment_id, payment_status, amount_gross, email_address } = ipnData;

            // Find the pre-saved order
            let order = await Order.findOne({ email: email_address, status: 'pending' });
            if (order) {
                order.orderId = pf_payment_id;
                order.status = payment_status === 'COMPLETE' ? 'processing' : 'failed';
                await order.save();

                res.status(200).json({ message: 'Payment confirmed', order });
            } else {
                res.status(404).json({ error: 'Order not found for IPN update' });
            }
        } else {
            console.error('Invalid IPN received');
            res.status(400).json({ error: 'Invalid IPN' });
        }
    } catch (error) {
        console.error('Error confirming payment:', error);
        res.status(500).json({ error: 'Failed to confirm payment' });
    }
});

// Fetch orders by email
router.get('/:email', async (req, res) => {
    const email = req.params.email;
    if (!email) {
        return res.status(400).send({ message: 'Email is required' });
    }

    try {
        const orders = await Order.find({ email }).sort({ createdAt: -1 });
        if (orders.length === 0) {
            return res.status(404).send({ message: 'No orders found for this email' });
        }
        res.status(200).send({ orders });
    } catch (error) {
        console.error('Error fetching orders by email:', error);
        res.status(500).send({ message: 'Failed to fetch orders by email' });
    }
});

// Fetch specific order by ID
router.get('/order/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).send({ message: 'Order not found' });
        }
        res.status(200).send(order);
    } catch (error) {
        console.error('Error fetching order by ID:', error);
        res.status(500).send({ message: 'Failed to fetch order' });
    }
});

// Fetch all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        if (orders.length === 0) {
            return res.status(404).send({ message: 'No orders found', orders: [] });
        }
        res.status(200).send(orders);
    } catch (error) {
        console.error('Error fetching all orders', error);
        res.status(500).send({ message: 'Failed to fetch all orders' });
    }
});

// Update order status
router.patch('/update-order-status/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).send({ message: 'Status is required' });
    }

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            {
                status,
                updatedAt: new Date(),
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedOrder) {
            return res.status(404).send({ message: 'Order not found' });
        }

        res.status(200).json({
            message: 'Order status updated successfully',
            order: updatedOrder,
        });
    } catch (error) {
        console.error('Error updating order status', error);
        res.status(500).send({ message: 'Failed to update order status' });
    }
});

// Delete order
router.delete('/delete-order/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedOrder = await Order.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(404).send({ message: 'Order not found' });
        }

        res.status(200).json({
            message: 'Order deleted successfully',
            order: deletedOrder,
        });
    } catch (error) {
        console.error('Error deleting order', error);
        res.status(500).send({ message: 'Failed to delete order' });
    }
});

module.exports = router;
