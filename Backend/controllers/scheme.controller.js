const schemeModel=require("../models/scheme.model");
const {validationResult}=require("express-validator")
const schemeService=require("../services/scheme.service")
module.exports.createScheme = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        const { title, description, category, startDate, endDate, eligibilityCriteria, applicationProcess, status } = req.body;
        const adminId = req.admin.id; 

        const scheme = await schemeService.createScheme({
            title,
            description,
            category,
            startDate,
            endDate,
            eligibilityCriteria,
            applicationProcess,
            status: status || "Active",
            admin: adminId,
        });

        res.status(201).json({ success: true, scheme });
    } catch (error) {
        next(error);
    }
};




module.exports.updateScheme = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        const { schemeId } = req.params;
        const updateData = req.body;
        const adminId = req.admin.id; 


        const updatedScheme = await schemeService.updateScheme(schemeId, adminId, updateData);

        res.status(200).json({ success: true, scheme: updatedScheme });
    } catch (error) {
        next(error);
    }
};


module.exports.getAllSchemes = async (req, res, next) => {
    try {
        const schemes = await schemeService.getAllSchemes();
        res.status(200).json({ success: true, schemes });
    } catch (error) {
        next(error);
    }
};

module.exports.getSchemeById = async (req, res, next) => {
    try {
        const { schemeId } = req.params;
        const scheme = await schemeService.getSchemeById(schemeId);

        if (!scheme) {
            return res.status(404).json({ message: "Scheme not found" });
        }

        res.status(200).json({ success: true, scheme });
    } catch (error) {
        next(error);
    }
};
