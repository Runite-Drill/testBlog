//Dependencies
const { application } = require("express");
const express = require("express");
let methodOverride = require("method-override");
const { route } = require(".");
const router = express.Router();

router.use(express.urlencoded({extended:true}));
router.use(methodOverride('_method'));

//Import article controller
const articleCtrl = require("../controllers/article");

//Routes
router.get("/article/add", articleCtrl.article_create_get);
router.post("/article/add", articleCtrl.article_create_post); //must equal the relevant action from the form in the relevant ejs file -- POST is CREATION of the record
router.get("/article/index", articleCtrl.article_index_get);
router.get("/article/detail", articleCtrl.article_show_get);
// router.delete("/article/delete", articleCtrl.article_delete_get); //delete used to show how methodOverride works. Can use GET without the methodOverride
router.get("/article/delete", articleCtrl.article_delete_get); //using GET to delete, without using methodOverride
router.get("/article/edit", articleCtrl.article_edit_get);
router.put("/article/update", articleCtrl.article_update_put); //Put method using method override -- PUT is UPDATING of the record (post will also work)




module.exports = router;