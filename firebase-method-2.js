const firebase = require('firebase');

const config = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
};

firebase.initializeApp(config);

const db = firebase.database();

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
