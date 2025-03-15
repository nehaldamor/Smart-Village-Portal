const express = require("express");
const { body } = require("express-validator");
const complaintController = require("../controllers/complaint.controller");
const authMiddleware=require("../middlewares/auth.middleware")
const router = express.Router();

router.post("/file", [
    body("category").notEmpty().withMessage("Category is required"),
    body("description").notEmpty().withMessage("Description is required").isLength({ min: 10 }).withMessage("Description must be at least 10 characters")
],authMiddleware.authUser, complaintController.fileComplaint);

router.put("/update/:id", [
    body("status").notEmpty().withMessage("Status is required").isIn(["Pending","In-Progress", "Resolved"]).withMessage("Invalid status")
], authMiddleware.authAdmin,complaintController.updateComplaintStatus);

router.get("/user-complaints", authMiddleware.authUser,complaintController.getUserComplaints);

router.get("/all-complaints",authMiddleware.authAdmin ,complaintController.getAllComplaints);

router.get("/:complaintId",authMiddleware.authAdmin, complaintController.getComplaintById);

router.put("/update-complaint/:complaintId", [
    body("category").optional().notEmpty().withMessage("Category is required"),
    body("description").optional().notEmpty().withMessage("Description is required").isLength({ min: 10 }).withMessage("Description must be at least 10 characters")
], authMiddleware.authUser, complaintController.updateComplaintByUser);

router.delete("/delete-complaint/:complaintId", authMiddleware.authUser, complaintController.deleteComplaintByUser);


module.exports = router;
