import firebase from '../firebase';

export function login(email, password) {
  return function(dispatch) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(result => {
      let user = {
        id: result.uid
      }
      console.log(result);
      dispatch({type: "SET_USER", payload: user})
    })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  }
}

