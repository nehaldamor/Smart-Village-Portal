const { validationResult } = require("express-validator");
const complaintService = require("../services/complaint.service");
const complaintModel=require("../models/complaint.model")
module.exports.fileComplaint = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Invalid input", errors: errors.array() });
    }

    const { category, description } = req.body;
    const userId = req.user._id; 

    try {
        const complaint = await complaintService.createComplaint({ userId, category, description });
        res.status(201).json({ complaint, message: "Complaint filed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.updateComplaintStatus = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Invalid input", errors: errors.array() });
    }

    const { status } = req.body;
    const { id } = req.params;

    try {
        const complaint = await complaintService.updateComplaintStatus(id, status);
        res.status(200).json({ complaint, message: "Complaint status updated" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getUserComplaints = async (req, res) => {
    const userId = req.user._id;
    try {
        const complaints = await complaintService.getUserComplaints(userId);
        res.status(200).json({ complaints });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getAllComplaints = async (req, res) => {
    try {
        const complaints = await complaintService.getAllComplaints();
        res.status(200).json({ complaints });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports.getComplaintById = async (req, res) => {
    try {
        const { complaintId } = req.params;

        const complaint = await complaintService.findComplaintById(complaintId);

        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        res.status(200).json({ complaint });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

module.exports.updateComplaintByUser = async (req, res) => {
    const { complaintId } = req.params;
    const userId = req.user._id; // current logged-in user

    const complaint = await complaintModel.findById(complaintId);
    if (!complaint) {
        return res.status(404).json({ message: "Complaint not found" });
    }

    if (complaint.user.toString() !== userId.toString()) {
        return res.status(403).json({ message: "Not authorized to update this complaint" });
    }

    const { category, description } = req.body;
    if (category) complaint.category = category;
    if (description) complaint.description = description;

    await complaint.save();
    res.status(200).json({ complaint, message: "Complaint updated successfully" });
}


module.exports.deleteComplaintByUser = async (req, res) => {
    const { complaintId } = req.params;
    const userId = req.user._id;

    const complaint = await complaintModel.findById(complaintId);
    if (!complaint) {
        return res.status(404).json({ message: "Complaint not found" });
    }

    if (complaint.user.toString() !== userId.toString()) {
        return res.status(403).json({ message: "Not authorized to delete this complaint" });
    }

    await complaintModel.findByIdAndDelete(complaintId);
    res.status(200).json({ message: "Complaint deleted successfully" });
}

