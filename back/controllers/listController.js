const path = require('path');
const response = require(path.join(__dirname, '../components/response'));
const awsHelper = require(path.join(__dirname, '../components/awsHelper'));
const Account = require(path.join(__dirname, '../models/account'));

/**
 *
 * @param req
 * @param res
 * @param next
 *
 * @returns {Promise<void>}
 */
exports.getLambdaFunctionsList = async function (req, res, next) {
    const account = await Account.findById(req.params.accountId).exec();
    if (!account) {
        res.status(400).json(response.error('Account not found'));

        return ;
    }

    const client = awsHelper.getAWSLambdaClientByAccount(account);

    try {
        const params = {
            Marker: null,
            MaxItems: 200
        };

        const data = await awsHelper.recursiveCall(client, 'listFunctions', 'Functions', params);

        res.json(response.success(data));
    } catch (e) {
        next(e);
    }
};
