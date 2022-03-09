//API's for User Authentication
//Include model
const User = require("../models/User");
const passport = require("passport");
const bcrypt = require("bcrypt");
const salt = 10;
const {validationResult} = require('express-validator');

// HTTP GET - SignUp - to load the signup form
exports.auth_signup_get = (req,res)=> {
    res.render("auth/signup");
}

// HTTP POST - SignUp - Post the signup data
exports.auth_signup_post = (req,res)=> {
    let user = new User(req.body);

    // Encrypt the password using bcrypt & salt
    let hash = bcrypt.hashSync(req.body.password, salt);
    user.password = hash;

    user.save()
    .then(()=>{res.redirect("/auth/signin")})
    .catch((err)=>{
        if (err.code === 11000) {
            req.flash("error", "A user account with this email address already exists.");
            res.redirect('/auth/signup');
        } else {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // res.status(4000).json({errors: errors.array})
                req.flash("validationErrors", errors.errors);
                res.redirect('/auth/signup');
            }
            // console.log(err); 
            // res.send("Error creating user: " + err._message+'.')
        }
        
    })
}

// HTTP GET - SignIn - to load the sign-in form
exports.auth_signin_get = (req,res) => {
    res.render("auth/signin")
}

// HTTP POST - SignIn - to post the sign-in data
exports.auth_signin_post = passport.authenticate("local", {
    successRedirect: "/articles/index", 
    failureRedirect: "/auth/signin",
    successFlash: "Logged in successfully.",
    failureFlash: "Invalid email address or password.",
})

// HTTP GET - logout - to logout the user
exports.auth_logout_get = (req,res) => {
    // This will clear the sessionv
    req.logout();
    req.flash("success", "Logout success!");
    res.redirect("/auth/signin");
}