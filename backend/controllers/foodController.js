import foodModel from "../models/foodModel.js";
import fs from 'fs/promises';  // Use promises-based fs for async/await

// Add food item
const addFood = async (req, res) => {
    const image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    });

    try {
        await food.save();
        res.status(201).json({ success: true, message: "Food Added" });
    } catch (error) {
        console.error("Error adding food:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// List all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.status(200).json({ success: true, data: foods });
    } catch (error) {
        console.error("Error listing foods:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Remove food item
const removeFood = async (req, res) => {
    const { id } = req.body;
    
    if (!id) {
        return res.status(400).json({ success: false, message: "Food ID is required" });
    }

    try {
        const food = await foodModel.findById(id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food Not Found" });
        }

        // Remove image file from uploads directory
        try {
            await fs.unlink(`uploads/${food.image}`);
        } catch (fileError) {
            console.error(`Failed to delete image: ${fileError.message}`);
        }

        await foodModel.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.error("Error removing food:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export { addFood, listFood, removeFood };
