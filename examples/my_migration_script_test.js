const admin = require("firebase-admin");

module.exports.run = async () => {
  const users = await admin.firestore().collection("users").get();
  const arr = users.docs.map((e) => e.data());
  console.log(arr);
};
