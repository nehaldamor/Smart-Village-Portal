const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema(
    {
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "admin",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            enum: ["Education", "Health", "Employment", "Agriculture", "Infrastructure", "Other"],
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true,
            index: { expires: 0 }
        },
        eligibilityCriteria: {
            type: String,
            required: true
        },
        applicationProcess: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active"
        }
    },
    { timestamps: true }
);


schemeSchema.index({ endDate: 1 }, { expireAfterSeconds: 0 });
const schemeModel = mongoose.model("scheme", schemeSchema)
module.exports = schemeModel;
