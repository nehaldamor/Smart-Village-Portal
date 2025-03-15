const express=require("express");
const router=express.Router();
const {body}=require("express-validator");
const authMiddleware=require("../middlewares/auth.middleware")
const adminController=require("../controllers/admin.controller");
router.post("/register",[
    body('fullname.firstname').isLength({min:3}).withMessage("firstname must 3 ch long"),
    body("fullname.lastname").isLength({min:3}).withMessage("lastname must 3 ch long"),
    body("email").isEmail().withMessage("enter valid email"),
    body("password").isLength({min:6}).withMessage("password must 6 ch long"),
    body("village").isLength({min:3}).withMessage("village must 3 ch long"),
    body("phone").isLength({min:10,max:10}).withMessage("phone must 10 digits long"),
    body("secretKey").isLength({min:6}).withMessage("secretKey must 6 ch long"),
],adminController.registerAdmin);

router.post("/login",[
    body("email").isEmail().withMessage("enter valid email"),
    body("password").isLength({min:6}).withMessage("password must 6 ch long"),
],adminController.loginAdmin);

router.get("/profile",authMiddleware.authAdmin,adminController.getAdminProfile);

router.get("/logout",authMiddleware.authAdmin,adminController.logoutAdmin);

router.put("/update-profile",[
    body('fullname.firstname').isLength({min:3}).withMessage("firstname must 3 ch long"),
    body("fullname.lastname").isLength({min:3}).withMessage("lastname must 3 ch long"),
    body("village").isLength({min:3}).withMessage("village must 3 ch long"),
], authMiddleware.authAdmin, adminController.updateAdminProfile);

router.post("/forgot-password",adminController.forgotPassword)

router.post("/reset-password",adminController.resetPassword)
module.exports=router;