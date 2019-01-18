const AWS = require('aws-sdk');

const getAWSClientByAccount = function(account) {
    return new AWS.APIGateway({
        region: account.region,
        apiVersion: '2015-07-09',
        credentials: {
            accessKeyId: account.accessKey,
            secretAccessKey: account.secretKey,
        }
    });
};

exports.getAWSClientByAccount = getAWSClientByAccount;

/**
 *
 * @param accounts
 */
exports.getAWSAccount = function(accounts) {
    return getAWSClientByAccount(accounts).getAccount({}).promise();
};
