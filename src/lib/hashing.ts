import bcrypt from 'bcrypt'

export const hashing = (text:string)=>{
     const hashedValue = bcrypt.hashSync(text,Number(process.env.SALT));
     return hashedValue;
}
export const compareHashed = (hashedValue:string, text:string)=>{
    const isEqual = bcrypt.compareSync(text,hashedValue);
    return isEqual;
}