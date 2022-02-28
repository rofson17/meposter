const router = require("express").Router();
const mongoose = require("mongoose");

const postsSchema = require("../models/postsSchema")
const authenticate = require("../authentication/authentication");


router.get("/allposts", async (req, res) => {
    postsSchema.find({}, (err, posts) => {
        res.status(200).json(posts)
    })
})


router.post("/posts", async (req, res) => {
    const { title, author, description } = req.body;

    try {
        if (!title || !author || !description)
            throw new Error("Please fill all fields")

        const savePosts = postsSchema({ title, author, description });
        await savePosts.save();

        res.status(200).json({ "message": "posted" });

    } catch (err) {
        return res.status(400).json({ "message": err });
    }

});

router.get("/postpage", authenticate, (req, res) => {
    return res.status(200).json({ "user": "posted" });
})


module.exports = router;