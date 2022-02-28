"use strict";
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const mail = require("../mail/mail")

const rand = Math.random();

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    activate: {
        type: Boolean,
        default: false
    },
    verifyCode: {
        type: String,
        default: rand
    },
    phoneNumber: {
        type: Number,
        required: true
    },

    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

usersSchema.pre('save', async function (next) {
    if (this.isModified('password')) {

        this.password = await bcrypt.hash(this.password, 12);

        await mail(this.email, "Verify your email for Me Poster", `<h2> activate your email:</h2> <a href="https://meposter.herokuapp.com/activate/${this.verifyCode}" >click here</a>`)

    }
    next();
});

usersSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRECT_KEY);
        this.tokens = this.tokens.concat({ token });
        return token;
    } catch (error) {
        console.log(error);
    }
}


const users = mongoose.model("users", usersSchema);
module.exports = users;