const firebaseAdmin = require('firebase-admin');

// Initialize the SDK

firebaseAdmin.initializeApp({

  credential: firebaseAdmin.credential.applicationDefault(),

  databaseURL: 'https://your-project-id.firebaseio.com'

});

// Authenticate a user with email and password

firebaseAdmin.auth().signInWithEmailAndPassword('user@example.com', 'password')

  .then(userCredential => {

    // User signed in

    console.log(userCredential.user.uid);

  })

  .catch(error => {

    // Handle authentication error

    console.error(error);

  });

// Create a new user

firebaseAdmin.auth().createUser({

  email: 'user@example.com',

  password: 'password'

})

  .then(userRecord => {

    // User created

    console.log(userRecord.uid);

  })

  .catch(error => {

    // Handle user creation error

    console.error(error);

  });

