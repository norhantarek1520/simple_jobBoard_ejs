const express = require('express');
let router = express();
const { AuthorizeController } = require('../Controller/auth_controller')
const { authorized } = require('../Middlware/authorized');

router.get('/login',  AuthorizeController.getLogin);
router.get('/registre',  AuthorizeController.getRegister);
router.get('/logout', authorized, AuthorizeController.logout)

router.post('/login',AuthorizeController.login)
router.post('/registre',AuthorizeController.registre)

module.exports = router;