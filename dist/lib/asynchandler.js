export const asyncHandler = (fn) => {
    return async (req, res, next) => {
        await fn(req, res, next).catch((error) => {
            if (!Object.keys(error)) {
                return next(new Error(error?.message));
            }
            const errorString = error.errors ? error.errors.map((e) => e.message).join(", ") : error;
            return next(new Error(errorString, { cause: 400 }));
        });
    };
};
//# sourceMappingURL=asynchandler.js.map