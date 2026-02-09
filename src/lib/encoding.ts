import jwt, { type SignOptions } from 'jsonwebtoken'


export const encoding = (payload:{[key:string]:string} ,expiresIn:string)=>{
    const encoded = jwt.sign(payload, process.env.JWT_SECRET || "", {expiresIn} as SignOptions);
    return encoded
}
export const decoding = (encodedValue:string )=>{
    const payload = jwt.verify(encodedValue, process.env.JWT_SECRET!)
    return payload
}