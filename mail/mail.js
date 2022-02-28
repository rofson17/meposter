"use strict";

const nodemailer = require("nodemailer");

const mail = async (to, subject, message) => {
    const transporter = nodemailer.createTransport({
        service: "Outlook365",
        auth: {
            user: process.env.SMTP_EMAIL_ADRESS,
            pass: process.env.SMTP_EMAIL_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.SMTP_EMAIL_ADRESS,
        to: to,
        subject: subject,
        html: message
    }
    await transporter.sendMail(mailOptions, (err, info) => {

        if (err) console.log(err)

    });

}


module.exports = mail