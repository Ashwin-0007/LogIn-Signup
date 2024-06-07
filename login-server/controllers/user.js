const User = require("../models/User.js");
const bcrypt = require("bcrypt");

const handleUserSignup = async (req, res) => {
    try {
        const { fullName, username, email, password, contactNumber } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await User.create({
            fullName: fullName,
            username: username,
            email: email,
            password: hashedPassword,
            contactNumber: contactNumber,
        });
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.log("Error creating user: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const handleUserLogin = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
        if (!user) {
            return res.status(404).json({ message: "Invalid username or email" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ message: "Invalid password" });
        }
        res.status(200).json({ message: "Login successfully" });

    } catch (error) {
        console.log("Error logging in user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const handleUserUpdate = async (req, res) => {
    try {
        const { email, password, fullName, username } = req.body;
        const userId = req.user.id;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const updateUser = await User.findByIdAndUpdate(
            { _id: userId },
            { email, password: hashedPassword, fullName, username }
        );

        if (!updateUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: 'User Successfully Updated' });

    } catch (error) {
        console.log("Error updating user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { handleUserSignup, handleUserLogin, handleUserUpdate };
