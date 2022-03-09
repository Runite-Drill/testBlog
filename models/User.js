const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        minLength: [3, "First name must be more than 3 characters"],
        maxLength: [99, "That's a long name! Do you think you can shroten it?"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [1, "Last name must be more than 1 character"],
        maxLength: [99, "That's a long name! Do you think you can shroten it?"]
    },
    emailAddress: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Your password must be at least 6 characters"],
        unique: true,
    },
},
    {timestamps: true}
)

//verify password
userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model("User", userSchema);

module.exports = User;