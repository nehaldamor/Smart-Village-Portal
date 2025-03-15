const { validationResult } = require("express-validator");
const noticeService = require("../services/notice.service");

module.exports.createNotice = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        const { title, description } = req.body;
        const adminId = req.admin.id;

        const notice = await noticeService.CreateNotice({
            title,
            description,
            admin: adminId
        });

        res.status(201).json({ success: true, notice });
    } catch (error) {
        next(error);
    }
};

module.exports.updateNotice = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Notice ID is required" });
        }

        const notice = await noticeService.UpdateNotice(id, { title, description });

        if (!notice) {
            return res.status(404).json({ error: "Notice not found" });
        }

        res.status(200).json({ success: true, notice });
    } catch (error) {
        next(error);
    }
};

module.exports.gteAllNotices=async (req,res,next)=>{
    try{
        const notices= await noticeService.getAllNotice()
       res.status(201).json(notices);
    }catch(err){
        res.status(400).json({message:"failed to fetch"})
    }
}
