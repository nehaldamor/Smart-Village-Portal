const express = require("express");
const { body } = require("express-validator");
const schemeController=require("../controllers/scheme.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();


router.post(
  "/create",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("category")
      .notEmpty()
      .withMessage("Category is required")
      .isIn(["Education", "Health", "Employment", "Agriculture", "Infrastructure","Other"])
      .withMessage("Invalid category"),
    body("startDate").notEmpty().withMessage("Start date is required").isISO8601().toDate(),
    body("endDate").notEmpty().withMessage("End date is required").isISO8601().toDate(),
    body("eligibilityCriteria").notEmpty().withMessage("Eligibility criteria is required"),
    body("applicationProcess").notEmpty().withMessage("Application process is required"),
    body("status").optional().isIn(["Active", "Inactive"]).withMessage("Invalid status"),
  ],authMiddleware.authAdmin,schemeController.createScheme
);

router.put(
    "/update/:schemeId",
    authMiddleware.authAdmin,  
    [
      body("title").optional().trim(),
      body("description").optional(),
      body("category").optional().isIn(["Education", "Health", "Employment", "Agriculture", "Infrastructure", "Other"]),
      body("startDate").optional().isISO8601().toDate(),
      body("endDate").optional().isISO8601().toDate(),
      body("eligibilityCriteria").optional(),
      body("applicationProcess").optional(),
      body("status").optional().isIn(["Active", "Inactive"]),
    ],
    schemeController.updateScheme
  );
  
router.get("/all", schemeController.getAllSchemes);
router.get("/:schemeId", schemeController.getSchemeById);


module.exports = router;
