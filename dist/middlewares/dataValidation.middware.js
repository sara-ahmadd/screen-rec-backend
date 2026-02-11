export const validateSchema = (schema) => {
    return async (req, res, next) => {
        try {
            const data = {
                ...req.body,
                ...req.params,
                ...req.query,
                file: req.file || req.files,
            };
            if (!req.file && !req.files)
                delete data.file;
            const validate = schema.validate(data, { abortEarly: false });
            if (validate.error) {
                const error = validate.error.details.map((e) => e.message).join(", ");
                return next(new Error(error, { cause: 400 }));
            }
            return next();
        }
        catch (error) {
            next(error);
        }
    };
};
//# sourceMappingURL=dataValidation.middware.js.map