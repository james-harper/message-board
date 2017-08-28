import Haikunator from 'haikunator';
import randomEmoji from 'random-emoji';
import Fingerprint2 from 'fingerprintjs2';

import firebase from '@/firebase';

const haikunator = new Haikunator;
let usersRef = firebase.database().ref('users');

/**
 * This application takes a slightly unconvential approach
 * to authentication.
 * Users are randomly assigned a username and an emoji avatar
 * based on their IP/browser and some other factors
 */
let getUserHash = () => {
  return new Promise((resolve, reject) => {
    new Fingerprint2({excludePlugins: true}).get(function(result, components){
      resolve(result);
    })
  });
}

let getFirebaseUser = hash => {
  return usersRef.child(hash).once('value').then(snap => snap);
}

let userPromise = getUserHash()
.then(hash => getFirebaseUser(hash))
.then(userSnap => {
  let data = userSnap.val();

  if (data) {
    return {
      id: userSnap.key,
      name: data.name,
      avatar: data.avatar
    };
  }

  let User = {};
  User.id = userSnap.key;
  User.name = haikunator.haikunate({tokenLength: 0, delimiter: "-"});
  User.avatar = randomEmoji.random({count: 1})[0].character;

  usersRef.child(userSnap.key).update(User);
  return User;
});

export default userPromise;
