"use strict";
const mongoose = require("mongoose");


const postsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: new Date().toLocaleString()
    }
});

const posts = mongoose.model("posts", postsSchema);
module.exports = posts;