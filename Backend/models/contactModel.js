const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        require: true,

    },
    userId: {
        type: String,
        require: true,

    }    // groupId: {
    //     type: String,
    //     require: true,
    // }

},
    {
        timestamps: true,
    }
);

const ContactModel = mongoose.model("contact", contactSchema);
module.exports = ContactModel;