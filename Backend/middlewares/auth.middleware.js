const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const adminModel=require("../models/admin.model");
module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "Unauthorized! No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next(); 
    } catch (err) {
        return res.status(401).json({ message: "Invalid token!" });
    }
};


module.exports.authAdmin = async (req, res, next) => {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "Unauthorized! No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await adminModel.findById(decoded._id).select("-password");

        if (!admin) {
            return res.status(401).json({ message: "admin not found" });
        }

        req.admin = admin;
        next(); 
    } catch (err) {
        return res.status(401).json({ message: "Invalid token!" });
    }
};


