export const errorHandle = (err, req, res, next) => {
    if ((err.message === "Unauthorized request") || (err.message === "jwt expired") ) {
        return res.status(401).json({response: "Unauthorized request", success: false});
    }

    // Handle other errors
    // console.error(err.stack); // Log the stack trace for debugging
    res.status(500).json({ response: "Internal Server Error", success: false});
};