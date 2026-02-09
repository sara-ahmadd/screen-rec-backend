import jwt from 'jsonwebtoken';
export declare const encoding: (payload: {
    [key: string]: string;
}, expiresIn: string) => string;
export declare const decoding: (encodedValue: string) => string | jwt.JwtPayload;
//# sourceMappingURL=encoding.d.ts.map