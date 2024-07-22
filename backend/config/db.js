import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://islamsalamaie:bB296aACa9nju4iT@cluster0.mw1ele7.mongodb.net/food-delivery').then(() => console.log('DB is connected'));
}