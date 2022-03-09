//Dependencies
const { application } = require("express");
const express = require("express");
let methodOverride = require("method-override");
const isLoggedIn = require('../helper/isLoggedIn');
const { route } = require(".");
const router = express.Router();

router.use(express.urlencoded({extended:true}));
router.use(methodOverride('_method'));

//Import author controller
const authorCtrl = require("../controllers/author");

//Routes
router.get("/author/add", isLoggedIn, authorCtrl.author_create_get);
router.post("/author/add", authorCtrl.author_create_post); //must equal the relevant action from the form in the relevant ejs file -- POST is CREATION of the record
router.get("/author/index", authorCtrl.author_index_get);
router.get("/author/detail", authorCtrl.author_show_get);
// router.delete("/author/delete", authorCtrl.author_delete_get); //delete used to show how methodOverride works. Can use GET without the methodOverride
router.get("/author/delete", isLoggedIn, authorCtrl.author_delete_get); //using GET to delete, without using methodOverride
router.get("/author/edit", isLoggedIn, authorCtrl.author_edit_get);
router.put("/author/update", authorCtrl.author_update_put); //Put method using method override -- PUT is UPDATING of the record (post will also work)




module.exports = router;