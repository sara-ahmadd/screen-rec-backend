import randomstring, {} from 'randomstring';
export const generateOtp = (options) => {
    const str = randomstring.generate(options ?? {});
    return str;
};
//# sourceMappingURL=generateOtp.js.map