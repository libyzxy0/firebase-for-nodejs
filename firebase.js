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
    callback({ msg: "success" });
  })
  .catch((error) => {
    callback({ msg: "error" });
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
      delete childData.id;
      dataArray.push(childData)
    });
    callback(dataArray);
  }
}).catch((error) => {
  callback({ msg: "error" });
});
}

function updateData(path, obj, callback) {
  const ref = db.ref(path);
  ref.update(obj)
  .then(() => {
    callback({ msg: "success" });
  })
  .catch((error) => {
    callback({ msg: "error" });
  });
}  

function removeData(path, callback) {
  const ref = db.ref(path);
  ref.remove()
  .then(() => {
    callback({ msg: "success" });
  })
  .catch((error) => {
    callback({ msg: "error" });
  });
}

module.exports = { writeData, readData, updateData, removeData } 
