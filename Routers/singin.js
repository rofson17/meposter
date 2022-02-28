const router = require("express").Router();
const bcryptjs = require("bcryptjs");


const usersSchema = require("../models/usersSchema");

router.post("/singin", async (req, res) => {

    const { email, password } = req.body;

    try {
        if (!email || !password)
            throw new Error("invalid credientials");

        const userLogin = await usersSchema.findOne({ email });

        if (userLogin && userLogin.activate === true) {
            const isMatch = await bcryptjs.compare(password, userLogin.password);

            if (!isMatch)
                throw new Error("invalid credientials");
            else {
                const token = await userLogin.generateAuthToken();

                res.cookie("meposter", token, {
                    expires: new Date(Date.now() + 25892000000)
                })

                return res.status(200).json({ "message": "sing in successfull" });
            }
        } else
            throw new Error("invalid credientials");

    } catch (error) {
        return res.status(400).json({ "message": "invalid credientials" });
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("meposter");

    res.status(200).json({ message: "success" });
})


module.exports = router;