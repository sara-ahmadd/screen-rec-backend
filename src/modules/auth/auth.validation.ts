import joi from "joi";

export const registerValidation = joi
  .object({
    user_name: joi.string().min(3).max(50),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().valid(joi.ref("password")).required(),
  })
  .required();

export const emailVerificationValidation = joi
  .object({
    email: joi.string().email().required(),
    otp: joi.string().required(),
  })
  .required();

export const newOtpValidation = joi
  .object({
    email: joi.string().email().required(),
  })
  .required();

export const forgotPasswordValidation = joi
  .object({
    email: joi.string().email().required(),
  })
  .required();

export const resetPasswordValidation = joi
  .object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().valid(joi.ref("password")).required(),
    otp: joi.string().required(),
  })
  .required();

export const updatePasswordValidation = joi
  .object({
    password: joi.string().required(),
    confirmPassword: joi.string().valid(joi.ref("password")).required(),
  })
  .required();

export const loginValidation = joi
  .object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  })
  .required();
