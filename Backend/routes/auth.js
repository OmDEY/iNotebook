const express = require('express')
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')
var fetchUser = require('../middleware/fetchUser')
const JWT_SECRET = "OMISACODE$R"
//Create a User using: POST "/api/auth". Doesn't require Auth
router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({success, error: "Sorry a user exists with the same email" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        // res.send(req.body);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        const data = {
            user: {
                id: user.id,
            },
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success,authtoken})
    } catch (error) {
        //Z.then(user => res.json(user));
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

//Authenticate a User using POST "api/auth/login". No login required 

router.post('/login', [
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async(req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Please try to login with correct credentials"})
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({success, error: "Please try to login with correct credentials"})
        }

        const payLoad = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(payLoad, JWT_SECRET);
        success = true;
        res.json({success, authtoken})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})


router.post('/getuser',fetchUser, async(req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router