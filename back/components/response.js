module.exports = {
    success: function(data, message = null) {
        return {
            success: true,
            data: data,
            message: message
        };
    },
    error: function(message, errors = null) {
        return {
            success: false,
            errors: errors,
            message: message
        }
    }
};
