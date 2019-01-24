const AWS = require('aws-sdk');
const _ = require('lodash');

/**
 *
 * @param account
 *
 * @returns {APIGateway}
 */
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

/**
 *
 * @param account
 *
 * @returns {Lambda}
 */
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
 *
 * @returns {Promise<Array>}
 */
const recursiveCallLambdaService = async function(client, method, dataAttributeName, params = {}) {
    let result = [];
    const response = await client[method](params).promise();

    if (Array.isArray(response[dataAttributeName])) {
        result = response[dataAttributeName];
        if (response['NextMarker']) {
            params.Marker = response['NextMarker'];
            const data = await recursiveCallLambdaService(client, method, dataAttributeName, params);

            result = _.concat(result, data);
        }
    }

    return result;
};

exports.recursiveCall = recursiveCallLambdaService;

/**
 *
 * @param client
 * @param method
 * @param dataAttributeName
 * @param params
 *
 * @returns {Promise<Array>}
 */
const recursiveCallGatewayService = async function(client, method, dataAttributeName, params = {}) {
    let result = [];
    const response = await client[method](params).promise();
    if (Array.isArray(response[dataAttributeName])) {
        result = response[dataAttributeName];
        if (result && Array.isArray(result) && response.position && result.length >= params.limit) {
            const newParams = {
                ...params,
                position: response.position,
            };
            const data = await recursiveCallGatewayService(client, method, dataAttributeName, newParams);

            result = _.concat(result, data);
        }
    }

    return result;
};

exports.recursiveCallGatewayService = recursiveCallGatewayService;
