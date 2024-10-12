import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import userModel from "../models/userModel.js";

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User Doesn't Exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid Credentials" });
        }

        const token = createToken(user._id);
        return res.status(200).json({ success: true, token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// Creating a token, the ID will be created by mongoDB DB
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

// Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // checking if the user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(409).json({ success: false, message: "User Already Exists" });
        }

        // validating email format and a strong password
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please Enter A Valid Email" });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please Enter A Strong Password" });
        }

        // Valid email and password --> encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // creating a new user
        const newUser = new userModel({
            name: name, email: email, password: hashedPassword
        });

        // Save in the DB
        const user = await newUser.save();

        // Creating A token so that we will send it to the user
        const token = createToken(user._id);
        return res.status(201).json({ success: true, token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export { loginUser, registerUser };
