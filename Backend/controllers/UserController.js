const userService = require('../services/userService');

async function registerUser(req, res) {
    let authUser= req.authUser;
    if(authUser.role == "admin"){
        const user = req.body;
        try{
            let registeredUser = await userService.registerUser(user);
            return res.status(201).json(
                registeredUser
            )
        }catch (err){
            console.log('Err ' ,err);
            res.status(400).json({
                message : 'Error ' + err.message
            })
        }
    }else {
        res.status(401).json({
            message : 'invalid user Role',
        })
    }


}

async function loginUser(req, res) {
    let user = req.body;
    console.log('user ',user);
    try{
        const loginUser = await userService.loginUser(user);
        return res.status(200).json(loginUser)
    }catch (err){
        return res.status(400).json(
            err.message
        );
    }
}

module.exports = {
    registerUser,
    loginUser,
}