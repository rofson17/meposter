const jwt = require("jsonwebtoken");
const usersSchema = require("../models/usersSchema");

const Authentication = async (req, res, next) => {
    try {
        const token = req.cookies.meposter;
        const verifyToken = jwt.verify(token, process.env.SECRECT_KEY);

        const user = await await usersSchema.findOne({ _id: verifyToken._id, "tokens:token": token });
        if (!user)
            throw new Error("user not found");
        res.status(200).json({ "author": user['name'], "email": user['email'] });
        next();

    } catch (err) {
        res.status(400).json({ "message": "Unauthorized user" })
    }
}

module.exports = Authentication;