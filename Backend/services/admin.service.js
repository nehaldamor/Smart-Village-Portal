const adminModel=require("../models/admin.model");
const sendEmail=require("../utils/email");
const bcrypt=require("bcrypt");

module.exports.createAdmin=({fullname,email,password,village,phone})=>{
    if(!fullname || !email || !password || !village || !phone){
        throw new Error('all fields required');
    }
    const admin=adminModel.create({
        fullname,
        email,
        password,
        village,
        phone,
    })
    return admin;
}

module.exports.updateAdmin = async (adminId, updateData) => {
    const updatedAdmin = await adminModel.findByIdAndUpdate(
        adminId,
        updateData,
        { new: true, runValidators: true }
    );
    return updatedAdmin;
};


module.exports.generateOTP = async (email) => {
    try {
        const admin = await adminModel.findOne({ email });
        if (!admin) return { status: 404, message: "admin not found" };
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        admin.resetOTP = otp;
        admin.resetOTPExpiry = Date.now() + 10 * 60 * 1000;
        await admin.save();

        await sendEmail(email, "Password Reset OTP", `Your OTP is: ${otp}`);

        return { status: 200, message: "OTP sent to email" };
    } catch (error) {
        return { status: 500, message: "Error generating OTP" };
    }
};

module.exports.verifyOTP = async (email, otp, newPassword) => {
    try {
        const admin = await adminModel.findOne({ email });
        if (!admin || admin.resetOTP !== otp || admin.resetOTPExpiry < Date.now()) {
            return { status: 400, message: "Invalid or expired OTP" };
        }
        admin.password = await bcrypt.hash(newPassword, 10);
        admin.resetOTP = undefined;
        admin.resetOTPExpiry = undefined;
        await admin.save();

        return { status: 200, message: "Password updated successfully" };
    } catch (error) {
        return { status: 500, message: "Error resetting password" };
    }
};