import jwt, {} from 'jsonwebtoken';
export const encoding = (payload, expiresIn) => {
    const encoded = jwt.sign(payload, process.env.JWT_SECRET || "", { expiresIn });
    return encoded;
};
export const decoding = (encodedValue) => {
    const payload = jwt.verify(encodedValue, process.env.JWT_SECRET);
    return payload;
};
//# sourceMappingURL=encoding.js.map