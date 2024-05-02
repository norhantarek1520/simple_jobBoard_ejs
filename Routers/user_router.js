
const express = require('express');
let router = express();
const { UserController } = require("../Controller/user_controller")
const { authorized } = require("../Middlware/authorized");


router.post('/editProfile', authorized, UserController.editProfile) // update users 

router.get('/profile' ,authorized , UserController.userProfile)
router.get('/editProfile' , authorized ,UserController.getEditProfile)



module.exports = router;