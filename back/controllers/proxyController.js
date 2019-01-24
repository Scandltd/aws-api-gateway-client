const path = require('path');
const Account = require(path.join(__dirname, '../models/account'));
const response = require(path.join(__dirname, '../components/response'));
const awsHelper = require(path.join(__dirname, '../components/awsHelper'));
const DEFAULT_LIMIT_API_GATEWAY = require(path.join(__dirname, '../enum/defaultValues')).DEFAULT_LIMIT_API_GATEWAY;

exports.proxyRequest = async function(method, accountId, payload, res, next) {
    try {
        const account = await Account.findById(accountId).exec();
        if (!account) {
            res.status(404);
            res.json(response.error('Entity not found'));

            return ;
        }

        const client = awsHelper.getAWSClientByAccount(account);
        const data = await client[method](payload).promise();

        res.json(response.success(data));
    } catch (error) {
        next(error);
    }
};

/**
 *
 * @param req
 * @param res
 * @param next
 *
 * @returns {Promise<void>}
 */
exports.getResources = async function(req, res, next) {
    try {
        const account = await Account.findById(req.params.accountId).exec();
        if (!account) {
            res.status(404);
            res.json(response.error('Entity not found'));

            return ;
        }

        const params = req.body;
        params.limit = !Number(params['limit']) ? DEFAULT_LIMIT_API_GATEWAY : Number(params['limit']);

        const client = awsHelper.getAWSClientByAccount(account);
        const data = await awsHelper.recursiveCallGatewayService(client, 'getResources', 'items', params);

        res.json(response.success(data));
    } catch (error) {
        next(error);
    }
};
