const express = require("express")
const { createNewUser, checkLogin } = require("../controller/userController")
const router = express.Router();

router.route('/signup')
    .post(createNewUser)

router.route('/login')
    .post(checkLogin)



// router.route('/login')
//     .post(getAllUser)

module.exports = router;