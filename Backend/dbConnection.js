const mongoose = require("mongoose");

function dbConnect(url) {
    mongoose.connect(url).then(() => console.log(`db Connected`));
}
module.exports = dbConnect;

