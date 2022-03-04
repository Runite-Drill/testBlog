const express = require("express");
const mongoose = require("mongoose");

const PORT = 6000;
const app = express();

app.listen(PORT, ()=>console.log(`App is running on ${PORT}`));