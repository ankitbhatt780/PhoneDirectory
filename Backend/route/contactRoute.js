const express = require("express")
const { addContact, getContactById, deleteContact } = require("../controller/contactController");
const router = express.Router();



router.route('/addContact')
    .post(addContact);

router.route('/getContact/:id')
    .get(getContactById);
router.route('/deleteContact/:id')
    .delete(deleteContact)

module.exports = router;
