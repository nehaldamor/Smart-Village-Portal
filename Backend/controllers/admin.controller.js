const { json } = require("express");
const adminModel = require("../models/admin.model");
const { validationResult } = require("express-validator");
const adminService = require("../services/admin.service");
module.exports.registerAdmin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "please fill required fields" });
    }
    const { fullname, email, village, phone, password, secretKey } = req.body;

    const isExist = await adminModel.findOne({ email });

    if (isExist) {
        return res.status(400).json({ message: "admin aready exist" });
    }
    if (secretKey != process.env.SECRETKEY) {
        return res.status(400).json({ message: "invalid secrete key" })
    }

    const hashedPassword = await adminModel.hashPassword(password);

    const admin = await adminService.createAdmin({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname,
        },
        email:email,
        password:hashedPassword,
        village:village,
        phone:phone
    })
    const admind={
        fullname,
        email,
        village,
        phone
    }
    const token = await admin.generateAuthToken();
    res.cookie("token", token);
    res.status(200).json({ admind,token })
}

module.exports.loginAdmin=async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(401).json("please fill required fields")
    }

    const {email,password}=req.body;

    const admin=await adminModel.findOne({email}).select("+password");

    if(!admin){
        return res.status(401).json({message:"invalid email or password"});
    }

    const isMatch=await admin.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({email:"invaid email or password"});
    }

    const token=await admin.generateAuthToken();
    res.cookie("token",token);
    const { password: _,resetOTP,resetOTPExpiry, _id, ...safeAdmin } = admin.toObject(); 
    res.status(201).json({admin: safeAdmin,token})
}

module.exports.getAdminProfile=async(req,res,next)=>{  
    res.status(200).json(req.admin);
}

module.exports.logoutAdmin=async (req,res,next)=>{
    res.clearCookie('token');

    res.status(200).json({message:"logout succefully"});
}


module.exports.updateAdminProfile = async (req, res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(401).json({message:"enter valid fields"})
    }

    try {
        const adminId = req.admin._id;  // Middleware se `req.user` aayega
        const updateData = req.body;  // Jo bhi update hona chahiye, body se aayega

        const updatedAdmin = await adminService.updateAdmin(adminId, updateData);

        if (!updatedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        res.status(200).json({ message: "Profile updated successfully", admin: updatedAdmin });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports.forgotPassword=async (req,res,next)=>{
       try {
            const { email } = req.body;
            const response = await adminService.generateOTP(email);
            res.status(response.status).json({ message: response.message });
        } catch (error) {
            res.status(500).json({ message: "Something went wrong" });
        }
}

module.exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const response = await adminService.verifyOTP(email, otp, newPassword);
        res.status(response.status).json({ message: response.message });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
