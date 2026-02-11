import joi from "joi";
export declare const fileObject: {
    fieldname: joi.StringSchema<string>;
    originalname: joi.StringSchema<string>;
    encoding: joi.StringSchema<string>;
    mimetype: joi.StringSchema<string>;
    destination: joi.StringSchema<string>;
    filename: joi.StringSchema<string>;
    path: joi.StringSchema<string>;
    size: joi.NumberSchema<number>;
};
export declare const registerValidation: joi.ObjectSchema<any>;
export declare const emailVerificationValidation: joi.ObjectSchema<any>;
export declare const newOtpValidation: joi.ObjectSchema<any>;
export declare const forgotPasswordValidation: joi.ObjectSchema<any>;
export declare const resetPasswordValidation: joi.ObjectSchema<any>;
export declare const updatePasswordValidation: joi.ObjectSchema<any>;
export declare const loginValidation: joi.ObjectSchema<any>;
export declare const editProfileValidation: joi.ObjectSchema<any>;
//# sourceMappingURL=auth.validation.d.ts.map