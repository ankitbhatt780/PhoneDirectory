const { getGroup } = require("./dbconnect");

async function newGroup(groupData) {
  const Group = await getGroup();
  let res = await Group.insertOne(groupData);
  return res;
}

async function getAllGroups(userId) {
  const Group = await getGroup();
  let res = await Group.find({ userId: userId }).toArray();
  return res;
}

async function updateGroup(condition, data) {
  const Group = await getGroup();
  let result = await Group(condition, data);
  return result;
}

// async function searchGroup(userId, searchText) {
//   const group = await getGroup();

//   let res = group
//     .aggregate([
//       {
//         $project: {
//           groupId: { $toObjectId: "$groupId" },
//           name: 1,
//           email: 1,
//           address: 1,
//           mobile: 1,
//         },
//       },
//       {
//         $lookup: {
//           from: "groups",
//           localField: "groupId",
//           foreignField: "_id",
//           as: "group",
//         },
//       },
//       {
//         $unwind: "$group",
//       },
//     ])
//     .toArray();
//   return res;
// }

module.exports = { newGroup, getAllGroups, updateGroup };
