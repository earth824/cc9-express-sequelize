const express = require('express');
const accountController = require('../controllers/accountController');

const router = express.Router();

router.get('/customers/:customerId', accountController.getAccountsByCustomerId);

module.exports = router;
