const mongoose = require("mongoose");

const authorSchema = mongoose.Schema(
    {
        name: String,
        emailAddress: String,
        phoneNumber: String,
        article: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Article',
        }], //Creating a relationship between two models - one author can have multiple articles
    },
    {timestamps:true}
)

 
const Author = mongoose.model("Author",authorSchema);

module.exports = Author;