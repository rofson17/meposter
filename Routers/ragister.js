const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mail = require("../mail/mail");


const usersSchema = require("../models/usersSchema");

router.post("/singup", async (req, res) => {

    const { name, email, phoneNumber, password, conformPassword } = req.body;

    try {
        if (!name || !email || !password || !conformPassword || !phoneNumber)
            throw new Error("Plsase fill all field")

        const isUserExist = await usersSchema.findOne({ email });

        if (isUserExist)
            throw new Error("user already exist");

        if (password === conformPassword) {

            const user = new usersSchema({ name, email, phoneNumber, password });

            await user.save();
            return res.status(200).json({ "message": "user registered successfully" });
        } else
            throw new Error("password don't match");

    } catch (err) {
        return res.status(400).json({ "message": err });
    }

})

router.get("/activate/:id", async (req, res) => {
    const verifyCode = req.params.id;
    const isUserExist = await usersSchema.findOne({ verifyCode });

    if (isUserExist) {
        isUserExist.activate = true;
        await isUserExist.save();
    }
    res.redirect("/");

})


module.exports = router;