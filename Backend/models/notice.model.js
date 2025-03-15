const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin",
        required: true,
    },
    title: {
        type: String,
        required: true,
        minlength: [3, "Title must be at least 3 characters long"],
    },
    description: {
        type: String,
        required: true,
        minlength: [10, "Description must be at least 10 characters long"],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expireAt: {  
        type: Date,
        default: function() {
            return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); 
        },
        expires: 0 
    }
});

const noticeModel = mongoose.model("notice", noticeSchema);

module.exports = noticeModel;
