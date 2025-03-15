const complaintModel = require("../models/complaint.model");

module.exports.createComplaint = async ({ userId, category, description }) => {
    const complaint = await complaintModel.create({ user: userId, category, description });
    return complaint;
};

module.exports.updateComplaintStatus = async (id, status) => {
    const complaint = await complaintModel.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
    if (!complaint) throw new Error("Complaint not found");
    return complaint;
};

module.exports.getUserComplaints = async (userId) => {
    return await complaintModel.find({ user: userId }).sort({ createdAt: -1 });
};

module.exports.getAllComplaints = async () => {
    return await complaintModel.find().populate("user", "fullname email").sort({ createdAt: -1 });
};

module.exports.findComplaintById = (complaintId) => {
    return complaintModel.findById(complaintId);
};