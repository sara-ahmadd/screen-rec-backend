import User from "../../db/models/user.model.js";
import { compareHashed, hashing } from "../../lib/hashing.js";
import { successResponse } from "../../lib/globalSuccessResponse.js";
import { emailEmitter } from "../../lib/sendingEmails.js";
import { generateOtp } from "../../lib/generateOtp.js";
import { sendEmailEvent } from "../../constants.js";
import { deleteCache, getCache, setCache } from "../../redis/cache.js";
import { otpTemplate } from "../../templates/otpTemplate.js";
import { encoding } from "../../lib/encoding.js";
const getOtp = (email, expireTime) => {
    //creat otp, send it in email, cache otp for comparing it later on
    const otp = generateOtp({ length: Math.floor(Math.random() * 3) + 4 });
    //cache otp in redis & it expires in 5 mins
    setCache(`otp:${email}`, otp, expireTime ?? 300);
    return otp;
};
const register = async (req, res) => {
    const { password, email } = req.body;
    const otp = getOtp(email);
    // send verification email for user
    emailEmitter.emit(sendEmailEvent, {
        subject: "Verification email",
        html: otpTemplate(otp, "ScreenRecorderApp", 5, "Email Verification"),
        to: req?.body?.email,
    });
    await User.create({ ...req.body, password: hashing(password) });
    const responseObj = successResponse("user is created succesfully, check your mailbox to activate your account");
    return res.status(201).json(responseObj);
};
const newOtp = async (req, res, next) => {
    const { email } = req.body;
    const otp = getOtp(email);
    emailEmitter.emit(sendEmailEvent, {
        subject: "Verification email",
        html: otpTemplate(otp, "ScreenRecorderApp", 5, "Email Verification"),
        to: req?.body?.email,
    });
    return res
        .status(200)
        .json(successResponse(`otp is sent to your email: ${email}`));
};
const verfiyemail = async (req, res, next) => {
    const { email, otp } = req.body;
    const cachedOtp = await getCache(`otp:${email}`);
    if (!cachedOtp || otp !== cachedOtp) {
        console.log({ otp });
        console.log({ cachedOtp });
        return next(new Error("invalid otp", { cause: 400 }));
    }
    const user = await User.findOne({ where: { email } });
    if (!user)
        return next(new Error("User is not found", { cause: 400 }));
    user?.setDataValue("isActivated", true);
    await user?.save();
    await deleteCache(`otp:${email}`);
    return res.status(200).json(successResponse("your account is activated"));
};
const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user)
        return next(new Error("User is not found", { cause: 400 }));
    const hashedPass = await user.getDataValue("password");
    if (!hashedPass || !compareHashed(hashedPass, password)) {
        return next(new Error("invalid credentials", { cause: 400 }));
    }
    const accessToken = encoding({ email, id: user.getDataValue("id") }, process.env.ACCESS_TOK);
    const refreshToken = encoding({ email, id: user.getDataValue("id") }, process.env.REF_TOK);
    return res
        .status(200)
        .json(successResponse("logged in successfully", { accessToken, refreshToken }));
};
const googleLogin = async (req, res, next) => {
    const user = req.user;
    if (!user)
        return next(new Error("user is undefined"));
    const accessToken = encoding({ email: user.email ?? "", id: user.googleId ?? "" }, process.env.ACCESS_TOK);
    const refreshToken = encoding({ email: user.email ?? "", id: user.googleId ?? "" }, process.env.REF_TOK);
    return res
        .status(200)
        .json(successResponse("logged in successfully", { accessToken, refreshToken }));
};
const forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user)
        return next(new Error("User is not found", { cause: 400 }));
    // generate otp & cache its value
    const otp = getOtp(email, 600);
    emailEmitter.emit(sendEmailEvent, {
        subject: "Forgot Password Email",
        html: otpTemplate(otp, "ScreenRecorderApp", 10, "Forgot Password Email"),
        to: email,
    });
    return res
        .status(200)
        .json(successResponse("otp sent to your email, use it to set a new password"));
};
const resetPassword = async (req, res, next) => {
    const { email, password, otp } = req.body;
    const cachedOtp = await getCache(`otp:${email}`);
    if (!cachedOtp || otp !== cachedOtp) {
        console.log({ otp });
        console.log({ cachedOtp });
        return next(new Error("invalid otp", { cause: 400 }));
    }
    const user = await User.findOne({ where: { email } });
    if (!user)
        return next(new Error("User is not found", { cause: 400 }));
    user.setDataValue("password", hashing(password));
    await user.save();
    return res
        .status(200)
        .json(successResponse("your password is rest successfully"));
};
const updatePassword = async (req, res, next) => {
    const u = req.user;
    const { password } = req.body;
    const user = await User.findOne({ where: { email: u?.email ?? "" } });
    if (!user)
        return next(new Error("User is not found", { cause: 400 }));
    user.setDataValue("password", hashing(password));
    // update changePassword with current time
    const currDate = new Date();
    user.setDataValue("changeCreds", currDate);
    await user.save();
    return res
        .status(200)
        .json(successResponse("your password is rest successfully"));
};
const logout = async (req, res, next) => {
    const u = req.user;
    const user = await User.findOne({ where: { email: u?.email ?? "" } });
    if (!user)
        return next(new Error("User is not found", { cause: 400 }));
    // update changePassword with current time
    const currDate = new Date();
    user.setDataValue("changeCreds", currDate);
    await user.save();
    return res.status(200).json(successResponse("you logged out successfully"));
};
const refreshToken = async (req, res, next) => {
    const u = req.user;
    const user = await User.findOne({ where: { email: u?.email ?? "" } });
    if (!user)
        return next(new Error("User is not found", { cause: 400 }));
    const accessToken = encoding({ email: u.email ?? "", id: u.id }, process.env.ACCESS_TOK);
    const refreshToken = encoding({ email: u.email ?? "", id: u.id }, process.env.REF_TOK);
    return res.status(200).json(successResponse("token refreshed successfully", {
        accessToken,
        refreshToken,
    }));
};
const getProfile = async (req, res, next) => {
    const u = req.user;
    const user = await User.findOne({
        where: { email: u?.email ?? "" },
        attributes: {
            exclude: [
                "password",
                "isActivated",
                "createdAt",
                "deletedAt",
                "updatedAt",
                "changeCreds",
                "googleId",
            ],
        },
    });
    return res
        .status(200)
        .json(successResponse("profile fetched successfully", { user }));
};
export { register, verfiyemail, newOtp, login, googleLogin, forgotPassword, resetPassword, updatePassword, logout, refreshToken, getProfile, };
//# sourceMappingURL=auth.service.js.map