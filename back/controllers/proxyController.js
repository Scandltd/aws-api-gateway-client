const path = require('path');
const Account = require(path.join(__dirname, '../models/account'));
const response = require(path.join(__dirname, '../components/response'));
const getAWSClient = require(path.join(__dirname, '../components/awsHelper')).getAWSClientByAccount;

exports.proxyRequest = async function(method, accountId, payload, res, next) {
    try {
        const account = await Account.findById(accountId).exec();
        if (!account) {
            res.status(404);
            res.json(response.error('Entity not found'));

            return ;
        }

        const client = getAWSClient(account);
        const data = await client[method](payload).promise();

        res.json(response.success(data));
    } catch (error) {
        next(error);
    }
};
