const mongoose = require("mongoose");
const noticeModel = require("../models/notice.model");

module.exports.CreateNotice = async ({ title, description, admin }) => {
    if (!title || !description || !admin) {
        throw new Error("All fields are required");
    }

    const notice = await noticeModel.create({ title, description, admin });
    return notice;
};

module.exports.UpdateNotice = async (id, data) => {
    try {
        if (!id || !data.title || !data.description) {
            throw new Error("All fields are required");
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid Notice ID");
        }

        const updatedNotice = await noticeModel.findByIdAndUpdate(
            id,
            { title: data.title, description: data.description },
            { new: true, runValidators: true }
        );

        if (!updatedNotice) {
            throw new Error("Notice not found");
        }

        return updatedNotice;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports.getAllNotice=async ()=>{
    return await noticeModel.find().populate('admin','fullname email').sort({createdAt:-1});
}