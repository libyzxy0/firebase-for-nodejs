const admin = require('firebase-admin');

const sA = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(sA),
  databaseURL: process.env.DB_URL
});

const db = admin.database();

function writeData(path, obj, callback) {
  const ref = db.ref(path);
  ref.push(obj)
  .then((snapshot) => {
    callback({ msg: "success", method: "write" });
  })
  .catch((error) => {
    callback({ msg: "error", method: "write"});
  });
}

function readData(path, callback) {
  const ref = db.ref(path);
  ref.once('value', (snapshot) => {
  const data = snapshot.val();
  if (data) {
    let dataArray = [];
    snapshot.forEach((childSnapshot) => {
      const childData = childSnapshot.val();
      childData["fid"] = childSnapshot.key;
      dataArray.push(childData)
    });
    callback(dataArray);
  }
}).catch((error) => {
  callback({ msg: "error", method: "read"});
});
}

function updateData(path, obj, callback) {
  const ref = db.ref(path);
  ref.update(obj)
  .then(() => {
    callback({ msg: "success", method: "update"});
  })
  .catch((error) => {
    callback({ msg: "error", method: "update"});
  });
}  

function removeData(path, callback) {
  const ref = db.ref(path);
  ref.remove()
  .then(() => {
    callback({ msg: "success", method: "remove" });
  })
  .catch((error) => {
    callback({ msg: "error", method: "remove" });
  });
}

module.exports = { writeData, readData, updateData, removeData } 
