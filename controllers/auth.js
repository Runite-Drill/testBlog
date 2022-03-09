//API's for User Authentication
//Include model
const User = require("../models/User");
const passport = require("passport");
const bcrypt = require("bcrypt");
const salt = 10;

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
    .catch((err)=>{console.log(err); res.send("Error creating user: " + err._message+'.')})
}

// HTTP GET - SignIn - to load the sign-in form
exports.auth_signin_get = (req,res) => {
    res.render("auth/signin")
}

// HTTP POST - SignIn - to post the sign-in data
exports.auth_signin_post = passport.authenticate("local", {
    successRedirect: "/articles/index",
    failureRedirect: "/auth/signin",
})

// HTTP GET - logout - to logout the user
exports.auth_logout_get = (req,res) => {
    // This will clear the session
    req.logout();
    console.log('Logout success!');
    res.redirect("/auth/signin");
}