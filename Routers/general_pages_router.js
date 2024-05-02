const express = require('express');
let  router = express();
const {about ,homePage , contact, sendEmail , errorPage} = require('../Controller/general_pages_controller')
router.get('/', homePage);
router.get('/contact', contact);
router.get('/about', about);
router.post('/sendEmail' , sendEmail)
router.get('/errorPage' , errorPage)
module.exports = router
