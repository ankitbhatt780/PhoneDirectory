const fs = require("fs")

function req_history(req, res, next) {
    fs.appendFile("log-histroy.text", `\n=>${req.originalUrl},${req.method},${Date.now}`,
        (err, success) => {
            next();
        }
    )
}
function second(req, res, next) {
    console.log("second middleware");
    next();
}
module.exports = { req_history, second };