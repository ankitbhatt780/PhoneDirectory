// const { get } = require("core-js/core/dict");
const { search } = require("core-js/fn/symbol");
const { getContact } = require("./dbconnect");
// const { getUser } = require("./dbconnect");

async function newContact(userContact) {
  const Contact = await getContact();
  let res = await Contact.insertOne(userContact);
  return res;
}

async function getAllContacts(condition) {
  const Contact = await getContact();
  let res = Contact.aggregate([
    { $match: condition },
    {
      $project: {
        groupId: { $toObjectId: "$groupId" },
        name: 1,
        email: 1,
        address: 1,
        mobile: 1,
        userId: 1,
      },
    },
    {
      $lookup: {
        from: "groups",
        localField: "groupId",
        foreignField: "_id",
        as: "group",
      },
    },
    {
      $unwind: "$group",
    },
  ]).toArray();
  return res;
}

async function deleteContact(idObj) {
  const Contact = await getContact();
  let res = await Contact.deleteOne(idObj);
  res.send;
}
async function getContactById(idObj) {
  const Contact = await getContact();
  let res = await Contact.findOne(idObj);
  // console.log(res);
  return res;
}

async function updateContact(condition, data) {
  // console.log("ankit", data);
  const Contact = await getContact();
  let result = await Contact.updateOne(condition, data);
  return result;
}

async function searchContact(userId, searchText, groupId) {
  const Contact = await getContact();
  // let res = await Contact.find({
  //   $and: [
  //     { userId: userId },
  //     {
  //       $or: [
  //         { name: { $regex: searchText } },
  //         { address: { $regex: searchText } },
  //         { email: { $regex: searchText } },
  //         { mobile: { $regex: searchText } },
  //       ],
  //     },
  //   ],
  // }).toArray();
  let res = Contact.aggregate([
    {
      $match: {
        $and: [
          { userId: userId },
          {
            $or: [
              { name: { $regex: searchText } },
              { address: { $regex: searchText } },
              { email: { $regex: searchText } },
              { mobile: { $regex: searchText } },
              { groupId: { $regex: searchText } },
            ],
          },
        ],
      },
    },
    {
      $project: {
        groupId: { $toObjectId: "$groupId" },
        name: 1,
        email: 1,
        address: 1,
        mobile: 1,
      },
    },
    {
      $lookup: {
        from: "groups",
        localField: "groupId",
        foreignField: "_id",
        as: "group",
      },
    },
    {
      $unwind: "$group",
    },
  ]).toArray();
  return res;
}

module.exports = {
  newContact,
  getAllContacts,
  deleteContact,
  getContactById,
  updateContact,
  searchContact,
};
