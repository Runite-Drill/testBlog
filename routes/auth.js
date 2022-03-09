const router = require('express').Router();
const {body} = require('express-validator');

const authCtrl = require("../controllers/auth")

//Routes
router.get("/auth/signup", authCtrl.auth_signup_get);
router.post("/auth/signup", 
//Validation of signup form using express-validator
[
    body("firstName").isLength({min: 3, max: 99}).withMessage('First Name must be at least 5 characters long.'),
    body("lastName").isLength({min: 1, max: 99}).withMessage('Last Name must be at least 5 characters long.'),
    body("emailAddress").isEmail().withMessage('Must be a valid email address.'),
    body("password").isLength({min: 6}).withMessage('Password must be at least 6 characters long.'),
], authCtrl.auth_signup_post);
router.get("/auth/signin", authCtrl.auth_signin_get);
router.post("/auth/signin", authCtrl.auth_signin_post);
router.get("/auth/logout", authCtrl.auth_logout_get);

module.exports = router;