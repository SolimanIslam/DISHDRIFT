import Stripe from 'stripe';
import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user Order for frontend 
const placeOrder = async (req, res) => {
    const frontend_url = 'http://localhost:3000';
    try {
        // Creating a new order
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        // Save the new order in the db
        await newOrder.save();

        // Cleaning the user's cart data
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Create the stripe payment link
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        // Push the delivery charge
        line_items.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100
            },
            quantity: 1
        });

        // Create a session using the line items
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        res.status(200).json({ success: true, session_url: session.url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Verify the order payment
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.status(200).json({ success: true, message: "Payment Successful" });
        } else {
            // Payment is cancelled
            await orderModel.findByIdAndDelete(orderId);
            res.status(400).json({ success: false, message: "Payment Not Successful" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// User orders for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// Listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// API to update order status from admin panel
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.status(200).json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
