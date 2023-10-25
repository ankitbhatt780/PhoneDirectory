const express = require("express");
var bodyParser = require("body-parser");
const { ObjectId } = require("mongodb");
const { getContact } = require("./db/dbconnect");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const jwtKey = "placementadd";

const { newUser, getUserByEmail, checkLogin } = require("./db/User");
const {
  newContact,
  getAllContacts,
  deleteContact,
  updateContact,
  getContactById,
  searchContact,
} = require("./db/addcontact");
const { getAllGroups, newGroup, searchGroup } = require("./db/Groups");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post("/login", async (req, res) => {
  let user = await checkLogin(req.body.email, req.body.password);
  if (user == null) {
    res.send({ msg: `email id or password is wrong`, status: 201, data: "" });
  } else {
    let token = jwt.sign({ name: "abc" }, jwtKey, { expiresIn: "1h" });
    res.send({ msg: `success`, status: 200, data: user, token: token });
  }
  // console.log(token);
});

app.post("/signup", async (req, res) => {
  let user = await getUserByEmail({ email: req.body.email });

  if (user == null) {
    user = await newUser(req.body);
    res.send({
      msg: `success`,
      status: 200,
      data: user,
    });
  } else {
    res.send({
      msg: `${req.body.email} already exists`,
      status: 201,
      data: "",
    });
  }
});

app.post("/addContact", verifyToken, async (req, res) => {
  let contact = await newContact(req.body);
  if (contact.acknowledged == false) {
    res.send({ msg: `something went wrong`, status: 201, data: contact });
  } else {
    res.send({ msg: `success`, status: 200, data: contact });
  }
});

app.get("/getContacts/:id", verifyToken, async (req, res) => {
  let contacts = await getAllContacts({ userId: req.params.id });
  res.send({ msg: `success`, status: 200, data: contacts });
});

app.delete("/deleteContact/:id", async (req, res) => {
  let result = await deleteContact({
    _id: new ObjectId(req.params.id),
  });
  res.send({ msg: `success`, status: 200, data: result });
});

app.get("/searchContact/:contactText/:userId", async (req, res) => {
  // console.log("search contact");
  let contact = await searchContact(req.params.userId, req.params.contactText);
  if (contact) res.send({ msg: `success`, status: 200, data: contact });
  else res.send({ msg: `not Found `, status: 201, data: contact });
});

// app.get("/getContactBygroup/:groupText/:groupid", async (req, res) => {
//   let group = await searchGroup(req.params.groupid, req.params.group);
//   if (group) res.send({ msg: `succes`, status: 200, data: group });
//   else res.send({ msg: `not Found`, status: 201, data: group });
// });

app.get("/getContactById/:id", async (req, res) => {
  let contact = await getContactById({ _id: new ObjectId(req.params.id) });
  if (contact) res.send({ msg: `success`, status: 200, data: contact });
  else res.send({ msg: `no contact found`, status: 201, data: contact });
});

app.put("/updateContact/:id", async (req, res) => {
  // console.log("updateContact=>", req.body);
  let contact = await updateContact(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  // console.log("contact", Contact);
  if (contact.acknowledged == false) {
    res.send({ msg: `something went wrong`, status: 201, data: contact });
  } else {
    res.send({ msg: `success`, status: 200, data: contact });
  }
});

app.get("/getToken", async (req, res) => {
  let token = jwt.sign({ name: "abc" }, jwtKey, { expiresIn: "1h" });
  res.send(token);
});

app.get("/checkToken", verifyToken, async (req, res) => {
  let token = req.headers["token"];
  console.log(token);
  jwt.verify(token, jwtKey, (err, result) => {
    if (err) {
      req.send(err);
    } else {
      res.send(result);
    }
  });
});

function verifyToken(req, res, next) {
  let token = req.headers["token"];
  // console.log("tokenmunu=>", token);
  if (token) {
    jwt.verify(token, jwtKey, (err, result) => {
      // console.log(err);
      if (err) {
        res.status(401).send({ msg: "invalid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({ msg: "token can not be empty!" });
  }
}

app.post("/addGroup", verifyToken, async (req, res) => {
  let group = await newGroup(req.body);
  if (group.acknowledged == false) {
    res.send({ msg: `something went wrong`, status: 201, data: group });
  } else {
    res.send({ msg: `success`, status: 200, data: group });
  }
  console.log(group);
});

app.get("/getGroups/:id", async (req, res) => {
  let groups = await getAllGroups(req.params.id);
  if (groups.acknowledged == true) {
    res.send({ msg: `success`, status: 200, data: groups });
  } else {
    res.send({ msg: `something went wrong`, status: 201, data: groups });
  }
  // console.log(groups);
});

app.listen(5000);
