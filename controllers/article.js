// API's for article module

//Include model
const Article = require("../models/Article"); //article object/class, so uppercase
const moment = require("moment");

//HTTP GET - load an Add Article form
exports.article_create_get = (req, res) => {
    res.render("article/add");
}

//HTTP POST - Article
exports.article_create_post = (req,res) => {
    console.log(req.body)

    let article = new Article(req.body);
    //save article into mongodb using promises
    article.save() //dots below are tagged onto the end of this, but put on a new line for clarity
    .then(()=>{res.redirect("/article/index")}) //successful save - promise has been fulfilled
    .catch((err)=>{console.log(err); res.send("Error creating article.")}) //unsuccessful save - promise has not been fulfilled
}

//HTTP GET - Article index
exports.article_index_get = (req,res)=>{
    Article.find() //get all articles
    .then((allArticles) => {
        if (req.query.showDrafts === "true") {
            res.render("article/index", {articles: allArticles, moment});
        } else {
            let articles = allArticles.filter(a=>{return a.isPublished}); //filter out hidden articles
            res.render("article/index", {articles: articles, moment});
        }
    }) //if successful, render them! (moment is short for moment: moment)
    .catch((err)=>{console.log(err); res.send("Error displaying articles.")})
}

//HTTP GET - Article by ID
exports.article_show_get = (req,res) => {
    console.log(req.query.id);
    Article.findById(req.query.id)
    .then((article) => {res.render("article/detail", {article, moment})})
    .catch((err)=>{console.log(err); res.send("Error displaying chosen article.")})
}

//HTTP DELETE - Article
exports.article_delete_get = (req,res) => {
    console.log("Deleting " + req.query.id);
    Article.findByIdAndDelete(req.query.id)
    .then(()=>{res.redirect("/article/index")})
    .catch((err)=>{console.log(err); res.send("Error deleting chosen article.")})
}

//HTTP GET - Load Article Edit Form
exports.article_edit_get = (req,res) => {
    console.log("Editing " + req.query.id);
    Article.findById(req.query.id)
    .then((article)=>{res.render("article/edit", {article})})
    .catch((err)=>{console.log(err); res.send("Error loading edit form for chosen article.")})
}

//HTTP PUT - Article Update
exports.article_update_put = (req,res) => {
    Article.findByIdAndUpdate(req.body.id, req.body)
    .then(()=>{res.redirect("/article/index")})
    .catch((err)=>{console.log(err); res.send("Error updating article.")})
}