const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
let jwt = require('jsonwebtoken')

ROUTER.post('/auth/login', (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.pass;
        console.log(username);
        if (username !== "cong" || password !== "cong") {
            return res.send("pass sai")
        }
        const payload = {
            username: username
        }
        const token = jwt.sign(payload, 'SECRET');
        console.log(token);
        
        res.status(200).json({ ok: true, token, username: username })
    } catch (err) {
        // throw err
        res.status(200).send({ success: false, message: err });
    }
})
module.exports = ROUTER;
