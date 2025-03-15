const userModel=require("../models/user.model");
const sendEmail=require("../utils/email");
const bcrypt=require("bcrypt");
module.exports.createUser=({firstname,lastname,email,password,village,phone})=>{
    if(!firstname || !email || !password || !village || !phone){
        throw new Error('all fields required');
    
    }

    const user=userModel.create({
       fullname:{
        firstname,
        lastname
       },
        email,
        password,
        village,
        phone
    })
    return user;
}

module.exports.updateUser = async (userId, updateData) => {
    const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        updateData,
        { new: true, runValidators: true }
    );
    return updatedUser;
};


module.exports.generateOTP = async (email) => {
    try {
        const user = await userModel.findOne({ email });
        if (!user) return { status: 404, message: "user not found" };
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        user.resetOTP = otp;
        user.resetOTPExpiry = Date.now() + 10 * 60 * 1000;
        await user.save();

        await sendEmail(email, "Password Reset OTP", `Your OTP is: ${otp}`);

        return { status: 200, message: "OTP sent to email" };
    } catch (error) {
        return { status: 500, message: "Error generating OTP" };
    }
};

module.exports.verifyOTP = async (email, otp, newPassword) => {
    try {
        const user = await userModel.findOne({ email });
        if (!user || user.resetOTP !== otp || user.resetOTPExpiry < Date.now()) {
            return { status: 400, message: "Invalid or expired OTP" };
        }
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetOTP = undefined;
        user.resetOTPExpiry = undefined;
        await user.save();

        return { status: 200, message: "Password updated successfully" };
    } catch (error) {
        return { status: 500, message: "Error resetting password" };
    }
};