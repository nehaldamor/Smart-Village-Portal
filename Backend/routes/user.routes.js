const express=require("express");
const authMiddleware=require('../middlewares/auth.middleware')
const router=express.Router();
const userController=require("../controllers/user.controller");
const {body}=require("express-validator");
router.post("/register",[
    body('fullname.firstname').isLength({min:3}).withMessage("firstname must 3 ch long"),
    body("fullname.lastname").isLength({min:3}).withMessage("lastname must 3 ch long"),
    body("email").isEmail().withMessage("enter valid email"),
    body("password").isLength({min:6}).withMessage("password must 6 ch long"),
    body("village").isLength({min:3}).withMessage("village must 3 ch long"),
    body("phone").isLength({min:10,max:10}).withMessage("phone must 10 digits long"),
],userController.registerUser);

router.post("/login",[
    body("email").isEmail().withMessage("enter valid email"),
    body("password").isLength({min:6}).withMessage("password must 6 ch long"),
],userController.loginUser);

router.get("/profile",authMiddleware.authUser,userController.getUserProfile);

router.get('/logout',userController.logoutUser);

router.put("/update-profile",[
    body('fullname.firstname').isLength({min:3}).withMessage("firstname must 3 ch long"),
    body("fullname.lastname").isLength({min:3}).withMessage("lastname must 3 ch long"),
    body("village").isLength({min:3}).withMessage("village must 3 ch long"),
], authMiddleware.authUser, userController.updateUserProfile);

router.post("/forgot-password",userController.forgotPassword)

router.post("/reset-password",userController.resetPassword)

module.exports=router;