const AWS = require('aws-sdk');
const _ = require('lodash');

const getAWSAPIGatewayClientByAccount = function(account) {
    return new AWS.APIGateway({
        region: account.region,
        apiVersion: '2015-07-09',
        credentials: {
            accessKeyId: account.accessKey,
            secretAccessKey: account.secretKey,
        }
    });
};

const getAWSLambdaClientByAccount = function(account) {
    return new AWS.Lambda({
        region: account.region,
        apiVersion: '2015-03-31',
        credentials: {
            accessKeyId: account.accessKey,
            secretAccessKey: account.secretKey,
        }
    })
};

exports.getAWSClientByAccount = getAWSAPIGatewayClientByAccount;
exports.getAWSLambdaClientByAccount = getAWSLambdaClientByAccount;

/**
 *
 * @param accounts
 */
exports.getAWSAccount = function(accounts) {
    return getAWSAPIGatewayClientByAccount(accounts).getAccount({}).promise();
};

/**
 *
 * @param client
 * @param method
 * @param dataAttributeName
 * @param params
 * @returns {Promise<Array>}
 */
const recursiveCall = async function(client, method, dataAttributeName, params = {}) {
    let result = [];
    const response = await client[method](params).promise();

    if (Array.isArray(response[dataAttributeName])) {
        result = response[dataAttributeName];
        if (response['NextMarker']) {
            params.Marker = response['NextMarker'];
            result = _.concat(result, recursiveCall(client, method, dataAttributeName, params))
        }
    }

    return result;
};

exports.recursiveCall = recursiveCall;
