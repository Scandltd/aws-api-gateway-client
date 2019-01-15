const _ = require('lodash');

exports.normalizeErrors = function(errors) {
    return _.mapValues(errors, (item) => {
        return item.message;
    });
};
