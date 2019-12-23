const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(require('./serviceAccount.json'))
});

exports.onUserStatusChanged = functions.database
  .ref('/users/{userId}')
  .onUpdate(event => {
    const usersRef = admin.firestore().collection('users');
    return event.after.ref.once('value')
      .then(statusSnapshot => statusSnapshot.val())
      .then(status => {
       if (status.toString() === 'offline') {
         usersRef
           .doc(event.after.key)
           .update({
             status: status.toString()
           }).then(res => console.log(res)).catch(e => console.log(e));
       }
      })
  });
