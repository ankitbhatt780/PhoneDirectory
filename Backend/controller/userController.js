const UserModel = require("../models/userModel")
// const { ObjectId } = require("mongodb");

async function createNewUser(req, res) {
    try {
        const { name, email, password } = req.body
        let user = await UserModel.create({ name: name, email: email, password: password })
        return res.status(200).json({ msg: 'success', status: "200", result: user })
    }
    catch (err) {
        return res.status(409).json(err);
    }
}

async function checkLogin(req, res) {

    try {
        const { email, password } = req.body
        let user = await UserModel.findOne({ email: email, password: password });
        // console.log("kkkkkk/", user);

        if (user == null) {
            // console.log("lllll:::::", user);
            res.status(201).send({ msg: `email or password is wrong`, data: "" })

        }
        else {
            // console.log("PPPPP", user);
            res.json({ msg: `success`, status: 200, user })
        }

    }

    catch (err) {
        return res.status(409).json(err);
    }
}


module.exports = { createNewUser, checkLogin };