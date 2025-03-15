const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const noticeController = require("../controllers/notice.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post('/create', [
    body("title").isLength({ min: 3 }).withMessage("Title must be at least 3 characters long"),
    body("description").isLength({ min: 10 }).withMessage("Description must be at least 10 characters long")
], authMiddleware.authAdmin, noticeController.createNotice);

router.put("/update/:id", authMiddleware.authAdmin, noticeController.updateNotice);

router.get("/allnotice",noticeController.gteAllNotices)
module.exports = router;
