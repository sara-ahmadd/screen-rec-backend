import randomstring, { type GenerateOptions } from 'randomstring';

export const generateOtp = (options?:GenerateOptions) => {
const str = randomstring.generate(options??{})
return str;
}