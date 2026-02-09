import bcrypt from 'bcrypt';
export const hashing = (text) => {
    const hashedValue = bcrypt.hashSync(text, Number(process.env.SALT));
    return hashedValue;
};
export const compareHashed = (hashedValue, text) => {
    const isEqual = bcrypt.compareSync(text, hashedValue);
    return isEqual;
};
//# sourceMappingURL=hashing.js.map