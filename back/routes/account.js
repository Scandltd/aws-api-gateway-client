const express = require('express');
const router = express.Router();
const path = require('path');
const AccountController = require(path.join(__dirname, '../controllers/accountController'));

router.get('/', AccountController.getAccountList);
router.post('/', AccountController.createAccount);
router.delete('/:id', AccountController.deleteAccount);

module.exports = router;
