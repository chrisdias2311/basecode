const express = require('express');
const User = require('../schemas/userSchema');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post("/register", async (req, res) => {

    const saltRounds = 10;
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) return res.status(400).send("Account already exists");
        //bcrypt encryption
        console.log(req.body.password)
        bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
            console.log(hash);
            if (err) {
                console.log(err)
                res.send('error generating hash').status(500)
            }
            else {
                const NewUser = new User({
                    email: req.body.email,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    password: hash,
                })
                //save user here
                const saved = await NewUser.save().then((result) => {
                    console.log('user created');
                    res.status(200);
                }).catch((err) => {
                    console.log(err)
                });
            }
        })
    } catch (error) {
        console.log(error);
        res.send(error).status(500)
    }
})


router.post("/login", async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email }); //find user here
        if (user) {
            //bcrypt compare
            const match = await bcrypt.compare(req.body.password, user.password);
            if (match) {
                console.log('match')
                res.send(user).status(200);
            }
            else {
                console.log('incorrect password')
                res.send('incorrect password').send(401)
            }
        } else {
            res.send("No user found").send(401);
        }
    } catch (error) {
        res.send(error);
        console.log(error);
    }
})


module.exports = router;