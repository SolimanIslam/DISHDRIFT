import userModel from '../models/userModel.js';

// Add Items to a user
const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        // Fetch user and cart data
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" });
        }

        const cartData = user.cartData || {};

        // Add or update item in cart
        cartData[itemId] = (cartData[itemId] || 0) + 1;

        await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });
        res.status(200).json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Remove an item from a user cart
const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        // Fetch user and cart data
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" });
        }

        const cartData = user.cartData || {};

        // Update item in cart
        if (cartData[itemId]) {
            cartData[itemId] = Math.max(cartData[itemId] - 1, 0);
            await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });
            res.status(200).json({ success: true, message: "Removed From Cart" });
        } else {
            res.status(404).json({ success: false, message: "Item Not Found In Cart" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Fetch user Cart Data
const getCart = async (req, res) => {
    try {
        const { userId } = req.body;

        // Fetch user and cart data
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" });
        }

        res.status(200).json({ success: true, cartData: user.cartData || {} });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export { getCart, addToCart, removeFromCart };
