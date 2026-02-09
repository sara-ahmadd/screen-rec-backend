export const errorHandler = () => {
    return (error, req, res, next) => {
        const status = error.cause || 500;
        return res.status(status).json({ status: 'error', error: error.message, stack: error.stack });
    };
};
//# sourceMappingURL=globalErrorhandler.js.map