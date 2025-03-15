const schemeModel = require("../models/scheme.model");

module.exports.createScheme = async (schemeData) => {
    try {
        const newScheme = await schemeModel.create(schemeData);
        return newScheme;
    } catch (error) {
        throw new Error("Failed to create scheme: " + error.message);
    }
};




module.exports.updateScheme = async (schemeId, adminId, updateData) => {
    try {
    
        const scheme = await schemeModel.findById(schemeId);
        if (!scheme) {
            throw new Error("Scheme not found");
        }
        const updatedScheme = await schemeModel.findByIdAndUpdate(schemeId, updateData, { new: true });

        return updatedScheme;
    } catch (error) {
        throw new Error("Failed to update scheme: " + error.message);
    }
};



module.exports.getAllSchemes = async () => {
    try {
        return await schemeModel.find().populate("admin", "name email");
    } catch (error) {
        throw new Error("Failed to retrieve schemes: " + error.message);
    }
};

module.exports.getSchemeById = async (schemeId) => {
    try {
        return await schemeModel.findById(schemeId).populate("admin", "name email");
    } catch (error) {
        throw new Error("Failed to retrieve scheme: " + error.message);
    }
};

