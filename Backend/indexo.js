const express = require("express");
const app = express();

const PORT = 8080;

function getUsers(req, res) {
  res.json({ result: "get success" });
}
function newUsers(req, res) {
  res.json({ result: "post success" });
}
function updateUsers(req, res) {
  res.json({ result: "patch success" });
}
function deleteUsers(req, res) {
  res.json({ result: "delete successs" });
}

app.route("/api/users").get(getUsers).post(newUsers);
app.route("/api/users/:id").patch(updateUsers).delete(deleteUsers);
app.listen(PORT, () => console.log(`server is running at ${PORT} port}`));
