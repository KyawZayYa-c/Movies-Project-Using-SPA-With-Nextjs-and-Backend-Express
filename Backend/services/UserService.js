const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {config} = require("../config/Config");

async function registerUser(user) {
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(user.password, salt);

    let newUser = new User({
        username : user.username,
        password : hashedPassword,
        role : user.role,
    });

    let registeredUser = await newUser.save();
    let payload = {
        username : registeredUser.username,
        role : registeredUser.role,
    }
    const token = jwt.sign(payload, config.TOKEN_SECRET);
    return token;
}

async function loginUser(user) {
    console.log('loginUser ', user);
    const Loginuser = await User.findOne({
        username : user.username,
    });
    if(!Loginuser){
        throw new Error('Invalid user');
    }else {
        const valid = await bcrypt.compare(user.password, Loginuser.password);
        if(!valid){
            throw new Error('Invalid password');
        }else {
            let payload = {
                username : Loginuser.username,
                role : Loginuser.role,
            }
            const token = jwt.sign(payload, config.TOKEN_SECRET);
            return token;
        }
    }
}

module.exports = {
    registerUser,
    loginUser,
}
