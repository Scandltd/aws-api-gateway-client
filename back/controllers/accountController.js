const path = require('path');
const Account = require(path.join(__dirname, '../models/account'));
const response = require(path.join(__dirname, '../components/response'));

exports.getAccountList = async function(req, res, next){
    try {
        const accounts = await Account.find({}).exec();

        res.json(response.success(accounts));
    } catch (e) {
        return next(e);
    }
};

exports.createAccount = async function(req, res, next) {
    try {
        const entity = new Account(req.body);
        const errors = entity.validateSync();
        if ( errors ) {
            return next(errors);
        }

        await entity.save();

        res.json(response.success(entity, 'Account successfully created'));
    } catch (e) {
        return next(e);
    }
};

exports.deleteAccount = async function(req, res, next) {
    try {
        const entity = await Account.findById(req.params.id).exec();
        if (!entity) {
            res.status(404);
            res.json(response.error('Entity not found'));

            return ;
        }

        await entity.remove();

        res.json(response.success({}, 'Account successfully removed'));
    } catch (e) {
        return next(e);
    }
};
