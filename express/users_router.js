module.exports = () => {
    let express = require('express');
    let router = express.Router();

    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcrypt');
    const mongoose = require('mongoose');


    let User = mongoose.model('User', {
        username: String,
        password: String
    });

    router.post('/', (req, res) => {
        let username = req.body.username;
        let password = req.body.password;

        let cryptedPass = "nothing";

        bcrypt.hash(password, 10, function(err, hash){
            cryptedPass = hash;

            let newUser = new User({
                username: username,
                password: cryptedPass
            });

            newUser.save((err) => {
                if(err)
                    console.error(err)
            });
            console.log(`Hash generated for ${username}`);
        });
        res.status(501).json({msg: "POST new user not implemented"});
    });

    router.put('/', (req, res) => {
        // TODO: Implement user update (change password, etc).
        res.status(501).json({msg: "PUT update user not implemented"});
    });

    router.post('/authenticate', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            let msg = "Username or password missing!";
            console.error(msg);
            res.status(401).json({msg: msg});
            return;
        }

        User.findOne({username: username}).exec(function (err, user) {
            console.log("#### USER ####");
            console.log(user);

            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (result) {
                        const payload = {
                            username: username,
                            admin: false
                        };
                        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

                        res.json({
                            msg: 'User authenticated successfully',
                            token: token,
                            user_id: user._id
                        });
                    }
                    else res.status(401).json({msg: "Password mismatch!"})
                });
            } else {
                res.status(404).json({msg: "User not found!"});
            }
        });
    });

    return router;
};