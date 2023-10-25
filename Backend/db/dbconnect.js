//---------------------------------> DATA BASE CONNECTION<------------------------------------------------

const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017//";
const dbName = "DTD";
const client = new MongoClient(url);

const getUser = async () => {
  let result = await client.connect();
  db = result.db(dbName);
  return (collection = db.collection("user"));
};
const getContact = async () => {
  let result = await client.connect();
  db = result.db(dbName);
  return (collection = db.collection("contact"));
};
const getGroup = async () => {
  let result = await client.connect();
  db = result.db(dbName);
  return (collection = db.collection("groups"));
};

module.exports = { getUser, getContact, getGroup };
