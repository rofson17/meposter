"use strict";

const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
var cookies = require("cookie-parser");


// app config
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookies());

// routers
app.use(require("./Routers/contact.js"));
app.use(require("./Routers/posts.js"));
app.use(require("./Routers/singin"));
app.use(require("./Routers/ragister"));

// connect to the database
require("./db/connection")

if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    )
}
app.listen(PORT, () => {
    console.log(`listening to the port ${PORT}`);
})