import express  from "express"
import * as authServices from './auth.service.js'
import { validateSchema } from "../../middlewares/data.validate.js";
import {emailVerificationValidation, loginValidation, newOtpValidation, registerValidation} from './auth.validation.js'
import { asyncHandler } from "../../lib/asynchandler.js";
const router = express.Router();


// register
router.post('/register',validateSchema(registerValidation),asyncHandler(authServices.register))

// verify email (activate account)
router.post('/verify',validateSchema(emailVerificationValidation),asyncHandler(authServices.verfiyemail))

// resend otp
router.post('/resend-otp',validateSchema(newOtpValidation),asyncHandler(authServices.newOtp))

// login
router.post('/login',validateSchema(loginValidation), asyncHandler(authServices.login))

export default router;