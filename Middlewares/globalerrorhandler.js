//globalError Handler

const globalErrorHandler = (err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({
        status: "error",
        message: err.message,
    });
    }

export default globalErrorHandler