import expressAsyncHandler from "express-async-handler";
import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import hashPassword from "../utils/hashpassword.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = expressAsyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const existingUser = await User.findOne({ email });
    if(existingUser){
        res.json({
            message: "User already exists"
        })
    }

    const passwordchecker = (password) => {
        if (password.length < 6) {
            throw new Error("Password must be at least 6 characters long");
        } else if (password.length > 20) {
            throw new Error("Password must be at most 20 characters long");
        } else if (!/[a-z]/.test(password)) {
            throw new Error("Password must contain at least one lowercase letter");
        } else if (!/[A-Z]/.test(password)) {
            throw new Error("Password must contain at least one uppercase letter");
        } else if (!/[0-9]/.test(password)) {
            throw new Error("Password must contain at least one number");
        } else if (!/[!@#$%^&*]/.test(password)) {
            throw new Error("Password must contain at least one special character");
        }
        return password;
    };

    try {
        passwordchecker(password);
        const hashedPassword = await hashPassword(password);
        const user = await User.create({ name, email, password: hashedPassword });

        if (user) {
            res.status(201).json({
                message: "User created successfully",
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            });
        }
    } catch (error) {
        next(error);
    }
});


export const LoginUser = expressAsyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Check if email and password are provided
        if (!email || !password) {
            res.status(400);
            throw new Error("Please fill all the fields");
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User does not exist"
            });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        // Generate JWT token
        const token = generateToken(user._id, user.email);

        // Respond with success message and token
        return res.json({
            message: "Login successful",
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token
        });

    } catch (error) {
        next(error);
    }
});


//fetchallUsers

export const getAllUsers = expressAsyncHandler(async (req,res,next)=>{
    const users = await User.find();
    res.json(users);
})


//fetchUserById
export const fetchUser = expressAsyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const user = await User.findById(id)
    if(!user){
        return res.status(404).json({
            message: "User not found"
        })
    }
    res.json({Username: user.name})
    });

export const UpdateUser = expressAsyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const user = await User.findById(id)
    if(!user){
        return res.status(404).json({
            message: "User not found"
        })
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    const updatedUser = await user.save();
    res.json({
        message: "User updated successfully",
        Username: updatedUser.name})
})