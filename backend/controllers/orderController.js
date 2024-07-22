import Stripe from 'stripe';
import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user Order for frontend 
const placeOrder = async (req, res) => {
    const frontend_url = 'http://localhost:3000';

    // creating a new order
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        // save the new order in the db
        await newOrder.save();

        // cleaning the user's cart data
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

        // push the delivery charge
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

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
}

// it is better to use webhooks, but this is a temporary way of doing it for simplicity
// verify the order payment
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == 'true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" });
        } else {
            // payment is cancelled
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" })
    }
}

export { placeOrder, verifyOrder };
