"use strict";

const router = require("express").Router();
const Authentication = require("../authentication/authentication");

const mail = require("../mail/mail");

router.post("/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message)
        return res.status(400).json({ "message": "failed" });

    // send mail code
    const authorEamil = process.env.AUTHOR_EMAIL;

    mail(authorEamil, subject, `
        <h2>Name: ${name}</h2>\n
        <h2>Email: ${email}</h2>\n\n
        <b>Message: </b>\n
        ${message}
    `).then(() => {
        return res.status(200).json({ "message": "success" });

    }).catch(err => {
        console.log(err);
        return res.status(400).json({ "message": "failed" });
    })


});


module.exports = router;