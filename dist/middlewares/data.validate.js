export const validateSchema = (schema) => {
    return async (req, res, next) => {
        const data = { ...req.body, ...req.params, ...req.query };
        const validate = schema.validate(data, { abortEarly: false });
        if (validate.error) {
            const error = validate.error.details.map(e => e.message).join(", ");
            return next(new Error(error, { cause: 400 }));
        }
        return next();
    };
};
//# sourceMappingURL=data.validate.js.map