const path = require('path');
const Account = require(path.join(__dirname, '../models/account'));
const response = require(path.join(__dirname, '../components/response'));

/**
 *
 * @param req
 * @param res
 * @param next
 *
 * @returns {Promise<*>}
 */
exports.getAccountList = async function(req, res, next) {
    try {
        const accounts = await Account.find({}).exec();

        res.json(response.success(accounts));
    } catch (e) {
        return next(e);
    }
};

/**
 *
 * @param req
 * @param res
 * @param next
 *
 * @returns {Promise<*>}
 */
exports.getAccount = async function(req, res, next) {
    try {
        const entity = await Account.findById(req.params.id).exec();
        if (!entity) {
            res.status(404);
            res.json(response.error('Entity not found'));

            return ;
        }

        res.json(response.success(entity));
    } catch (e) {
        return next(e);
    }
};

/**
 *
 * @param req
 * @param res
 * @param next
 *
 * @returns {Promise<*>}
 */
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

/**
 *
 * @param req
 * @param res
 * @param next
 *
 * @returns {Promise<*>}
 */
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

/**
 *
 * @param req
 * @param res
 * @param next
 *
 * @returns {Promise<*>}
 */
exports.putAccount = async function(req, res, next) {
    try {
        const entity = await Account.findById(req.params.id).exec();
        if (!entity) {
            res.status(404);
            res.json(response.error('Entity not found'));

            return ;
        }

        await entity.update(req.body);

        res.json(response.success(entity, 'Account successfully updated'));
    } catch (e) {
        return next(e);
    }
};
