const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../Models/userModel');

exports.Register = async (req, res) => {
    try {
        const { name, email, password, role, phone, flat_id } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "This email is already in use", success: false });
        }
        
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long", success: false });
        }

        const validRoles = ['Admin', 'Resident', 'Guard'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role specified", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            phone,
            flat_id: flat_id || null
        });

        res.status(201).json({ message: "Account created successfully", success: true, data: {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        }});

    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials", success: false });
        }

        // Include role and id in token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.MY_KEY, { expiresIn: "7d" });

        res.status(200).json({ 
            message: `Welcome ${user.name}`, 
            token, 
            role: user.role,
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                flat_id: user.flat_id
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};
