const express = require('express');
const router = express.Router();
const path = require('path');
const AccountController = require(path.join(__dirname, '../controllers/accountController'));
const ProxyController = require(path.join(__dirname, '../controllers/proxyController'));
const ListController = require(path.join(__dirname, '../controllers/listController'));

router.get('/', AccountController.getAccountList);
router.get('/:accountId', AccountController.getAccount);
router.post('/', AccountController.createAccount);
router.delete('/:accountId', AccountController.deleteAccount);
router.put('/:accountId', AccountController.putAccount);
router.post('/:accountId/proxy/getResources', ProxyController.getResources);
router.post('/:accountId/proxy/:method', (req, res, next) => {
    return ProxyController.proxyRequest(req.params.method, req.params.accountId, req.body, res, next);
});
router.get('/:accountId/list/lambda_function', ListController.getLambdaFunctionsList);

module.exports = router;
