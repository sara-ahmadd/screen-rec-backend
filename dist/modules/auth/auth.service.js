import User from "../../db/models/user.model.js";
import { compareHashed, hashing } from "../../lib/hashing.js";
import { successResponse } from "../../lib/globalSuccessResponse.js";
import { emailEmitter, sendEmail } from "../../lib/sendingEmails.js";
import { generateOtp } from "../../lib/generateOtp.js";
import { sendEmailEvent } from "../../constants.js";
import { deleteCache, getCache, setCache } from "../../redis/cache.js";
import { otpTemplate } from "../../templates/otpTemplate.js";
import { encoding } from "../../lib/encoding.js";
const sendOtp = (email, expireTime) => {
    //creat otp, send it in email, cache otp for comparing it later on
    const otp = generateOtp({ length: Math.floor(Math.random() * 3) + 4 });
    //cache otp in redis & it expires in 5 mins
    setCache(`otp:${email}`, otp, expireTime ?? 300);
    return otp;
};
const getUser = (email) => {
};
const register = async (req, res) => {
    const { password, email } = req.body;
    const otp = sendOtp(email);
    // send verification email for user
    emailEmitter.emit(sendEmailEvent, { subject: 'Verification email', html: otpTemplate(otp, 'ScreenRecorderApp', 5), to: req?.body?.email });
    await User.create({ ...req.body, password: hashing(password) });
    const responseObj = successResponse("user is created succesfully, check your mailbox to activate your account");
    return res.status(201).json(responseObj);
};
const newOtp = async (req, res, next) => {
    const { email } = req.body;
    const otp = sendOtp(email);
    emailEmitter.emit(sendEmailEvent, { subject: 'Verification email', html: otpTemplate(otp, 'ScreenRecorderApp', 5), to: req?.body?.email });
    return res.status(200).json(successResponse(`otp is sent to your email: ${email}`));
};
const verfiyemail = async (req, res, next) => {
    const { email, otp } = req.body;
    const cachedOtp = await getCache(`otp:${email}`);
    if (!cachedOtp || otp !== cachedOtp) {
        console.log({ otp });
        console.log({ cachedOtp });
        return next(new Error('invalid otp', { cause: 400 }));
    }
    const user = await User.findOne({ where: { email } });
    if (!user)
        return next(new Error('User is not found', { cause: 400 }));
    user?.setDataValue('isActivated', true);
    await user?.save();
    await deleteCache(`otp:${email}`);
    return res.status(200).json(successResponse('your account is activated'));
};
const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user)
        return next(new Error('User is not found', { cause: 400 }));
    const hashedPass = await user.getDataValue('password');
    if (!hashedPass || !compareHashed(hashedPass, password)) {
        return next(new Error('invalid credentials', { cause: 400 }));
    }
    ;
    const accessToken = encoding({ email, id: user.getDataValue('id') }, '2h');
    const refreshToken = encoding({ email, id: user.getDataValue('id') }, '7d');
    return res.status(200).json(successResponse('logged in successfully', { accessToken, refreshToken }));
};
export { register, verfiyemail, newOtp, login };
//# sourceMappingURL=auth.service.js.map