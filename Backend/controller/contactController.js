const ContactModel = require("../models/contactModel")
const { ObjectId } = require("mongodb")


async function addContact(req, res) {
    const contact = req.body
    // console.log("my contact", contact)
    try {

        let user = await ContactModel.create(contact);
        return res.status(200).send({ msg: 'success', status: 200, result: user })
    }
    catch (err) {
        return res.status(409).json(err);
    }
}

async function getContactById(req, res) {
    const userId = req.params.Id
    try {
        let user = await ContactModel.find(userId);
        if (user == null)
            return res.send({ msg: "someting went wrong", status: 201, result: "" });
        else
            return res.send({ msg: 'success', status: 200, result: user })
    }
    catch (err) {
        return res.status(409).json(err);
    }
}

async function deleteContact(req, res) {
    // const id = req.params.id;
    // console.log("==============>", req.params.id);
    // const id = new ObjectId(req.params.id)

    try {
        const id = new ObjectId(req.params.id)
        let result = await ContactModel.findByIdAndDelete({ _id: id });
        // console.log(user)
        res.send({ msg: 'success', status: 200, data: result });
    }
    catch (err) {
        return res.status(409).json(err);
    }
}

module.exports = { addContact, getContactById, deleteContact }