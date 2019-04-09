const express = require('express');
const auth = express.Router();
const auth_controller = require('../Controllers/auth_controllers');
const utility = require('../Utils/utils');


//Route Handling
auth.post('/signup', utility.upload.single('Image'), auth_controller.create_user);

auth.post('/login', auth_controller.signin_user)
    
module.exports= auth;