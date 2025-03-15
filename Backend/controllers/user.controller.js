const userModel=require('../models/user.model');
const {validationResult}=require("express-validator");
const userService=require('../services/user.service');
module.exports.registerUser=async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message:"please fill required fields"});
    }
    const {fullname,email,village,phone,password}=req.body;

    const isExist=await userModel.findOne({email});
    if(isExist){
        return res.status(400).json({message:"user already exist please login"});
    }

    const hashedPassword=await userModel.hashPassword(password);

    const user=await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email:email,
        password:hashedPassword,
        village:village,
        phone:phone
    })
    const token=user.generateAuthToken();
    const userd={
        fullname,
        email,
        village,
        phone
    }
    res.cookie('token',token);
    res.status(200).json({userd,token});
}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ message: "Please fill required fields" });
    }

    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = await user.generateAuthToken();
    res.cookie("token", token);

    
    const { password: _,resetOTP,resetOTPExpiry, _id, ...safeUser } = user.toObject(); 

    res.status(201).json({ user: safeUser, token });
};


module.exports.getUserProfile=async(req,res,next)=>{  
    res.status(200).json(req.user);
}

module.exports.logoutUser=async (req,res,next)=>{
    res.clearCookie('token');

    res.status(200).json({message:"logout succefully"});
}

module.exports.updateUserProfile = async (req, res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(401).json({message:"enter valid fields"})
    }

    try {
        const userId = req.user._id;  
        const updateData = req.body; 

        const updatedUser = await userService.updateUser(userId, updateData);

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const response = await userService.generateOTP(email);
        res.status(response.status).json({ message: response.message });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const response = await userService.verifyOTP(email, otp, newPassword);
        res.status(response.status).json({ message: response.message });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};