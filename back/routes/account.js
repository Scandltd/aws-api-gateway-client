const express = require('express');
const router = express.Router();
const path = require('path');
const AccountController = require(path.join(__dirname, '../controllers/accountController'));
const ProxyController = require(path.join(__dirname, '../controllers/proxyController'));

router.get('/', AccountController.getAccountList);
router.get('/:id', AccountController.getAccount);
router.post('/', AccountController.createAccount);
router.delete('/:id', AccountController.deleteAccount);
router.put('/:id', AccountController.putAccount);
router.post('/:id/proxy/:method', (req, res, next) => {
    return ProxyController.proxyRequest(req.params.method, req.params.id, req.body, res, next);
});

module.exports = router;
