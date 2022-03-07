//Initialise Express App
const express = require("express");
const mongoose = require("mongoose");

const PORT = 6001;
const app = express();

//Look in the views folder for a file name "layout.ejs"
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

//Import Routes
const indexRoute = require("./routes/index");
const articlesRoute = require("./routes/articles");
//Mount routes
app.use("/", indexRoute);
app.use("/", articlesRoute);

//NodeJS to look in a folder called views for ejs files
app.set("view engine", "ejs"); //i.e. no need for "../view/.."

//Connect to Mmngodb
mongoose.connect("mongodb://localhost:27017/blogapp",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    ()=>console.log("mongodb connected successfully!")
);

app.listen(PORT, () => console.log(`App is running on ${PORT}`));



app.get("/a", (req,res)=>{
    res.render("home/another")
})