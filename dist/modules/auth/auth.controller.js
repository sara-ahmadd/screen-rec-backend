import express from "express";
import * as authServices from "./auth.service.js";
import { validateSchema } from "../../middlewares/dataValidation.middware.js";
import { emailVerificationValidation, forgotPasswordValidation, loginValidation, newOtpValidation, registerValidation, resetPasswordValidation, updatePasswordValidation, } from "./auth.validation.js";
import { asyncHandler } from "../../lib/asynchandler.js";
import passport from "./../../google-auth/google.strategy.js";
import { isAuthenticated } from "../../middlewares/authenticate.middware.js";
const router = express.Router();
// register
router.post("/register", validateSchema(registerValidation), asyncHandler(authServices.register));
// verify email (activate account)
router.post("/verify", validateSchema(emailVerificationValidation), asyncHandler(authServices.verfiyemail));
// resend otp
router.post("/resend-otp", validateSchema(newOtpValidation), asyncHandler(authServices.newOtp));
// login with email & password
router.post("/login", validateSchema(loginValidation), asyncHandler(authServices.login));
/* google login */
//when user logs in with google this endpoint is triggered then passport authenticate the account
//and if authenticated google calls the callback endpoint
router.get("/google", passport.authenticate("google", {
    scope: ["email", "profile"],
    session: false,
}));
//callback API
router.get("/google/callback", passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
}), asyncHandler(authServices.googleLogin));
//forgot password
router.post("/forgot-password", validateSchema(forgotPasswordValidation), asyncHandler(authServices.forgotPassword));
//reset password
router.patch("/reset-password", validateSchema(resetPasswordValidation), asyncHandler(authServices.resetPassword));
//update password
router.patch("/update-password", asyncHandler(isAuthenticated), validateSchema(updatePasswordValidation), asyncHandler(authServices.updatePassword));
//logout (expire tokens)
router.get("/logout", asyncHandler(isAuthenticated), asyncHandler(authServices.logout));
//get new access token
router.get("/refresh-token", asyncHandler(isAuthenticated), asyncHandler(authServices.refreshToken));
//get profile
router.get("/me", asyncHandler(isAuthenticated), asyncHandler(authServices.getProfile));
export default router;
//# sourceMappingURL=auth.controller.js.map