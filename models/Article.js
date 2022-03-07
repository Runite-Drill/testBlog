// Dependencies
const mongoose = require("mongoose");
//Set up for MongoDB
const articleSchema = mongoose.Schema({
    title: String, //must match the name fields within the ejs
    description: String,
    content: String,
    isPublished: Boolean,
    totalWords: Number,
    author: String,
    },
    {timestamps:true} //is a mongodb shortcut for createdAt = Date.now and updatedAt = Date.now
);

//Create model with the name Article
const Article = mongoose.model("Article",articleSchema);

module.exports = Article;