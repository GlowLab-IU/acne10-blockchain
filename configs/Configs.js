var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://aiot-lab-vn-skincare-app-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const db = admin.firestore();
exports.db = db;

exports.admin = admin;
