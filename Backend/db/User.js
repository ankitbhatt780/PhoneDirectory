const { getUser } = require("./dbconnect");

async function newUser(userData) {
  const User = await getUser();
  let res = await User.insertOne(userData);
  return res;
}
async function getUserByEmail(userEmail) {
  const User = await getUser();
  let res = await User.findOne(userEmail);
  return res;
}
async function checkLogin(email, password) {
  const User = await getUser();
  let res = await User.findOne({ email: email, password: password });
  return res;
}

module.exports = { newUser, getUserByEmail, checkLogin };
