// API's for author module

//Include model
const Article = require("../models/Article"); //article object/class, so uppercase
const Author = require("../models/Author");
const moment = require("moment");

//HTTP GET - load an Add Author form
exports.author_create_get = (req, res) => {
    res.render("author/add");
}

//HTTP POST - Author
exports.author_create_post = (req,res) => {
    console.log(req.body)

    let author = new Author(req.body);
    //save author into mongodb using promises
    author.save() //dots below are tagged onto the end of this, but put on a new line for clarity
    .then(()=>{res.redirect("/author/index")}) //successful save - promise has been fulfilled
    .catch((err)=>{console.log(err); res.send("Error creating author.")}) //unsuccessful save - promise has not been fulfilled
}

//HTTP GET - Author index
exports.author_index_get = (req,res)=>{
    Author.find() //get all authors
    .then((allAuthors) => {
        res.render("author/index", {authors: allAuthors, moment});
    }) //if successful, render them! (moment is short for moment: moment)
    .catch((err)=>{console.log(err); res.send("Error displaying authors.")})
}

//HTTP GET - Author by ID
exports.author_show_get = (req,res) => {
    console.log(req.query.id);
    Author.findById(req.query.id).populate("article")
    .then((author) => {res.render("author/detail", {author, moment})})
    .catch((err)=>{console.log(err); res.send("Error displaying chosen author.")})
}

//HTTP DELETE - Author
exports.author_delete_get = (req,res) => {
    console.log("Deleting " + req.query.id);
    Author.findByIdAndDelete(req.query.id)
    .then(()=>{res.redirect("/author/index")})
    .catch((err)=>{console.log(err); res.send("Error deleting chosen author.")})
}

//HTTP GET - Load Author Edit Form
exports.author_edit_get = (req,res) => {
    console.log("Editing " + req.query.id);
    Author.findById(req.query.id)
    .then((author)=>{res.render("author/edit", {author})})
    .catch((err)=>{console.log(err); res.send("Error loading edit form for chosen author.")})
}

//HTTP PUT - Author Update
exports.author_update_put = (req,res) => {
    Author.findByIdAndUpdate(req.body.id, req.body)
    .then(()=>{res.redirect("/author/index")})
    .catch((err)=>{console.log(err); res.send("Error updating author.")})
}