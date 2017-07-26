import firebase from '../firebase';

export function login(email, password) {
  return function(dispatch) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(result => {
      dispatch({type: "USER_LOGIN", payload: result.uid})
      console.log("User Logged In!")
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


export function logout() {
  return function(dispatch) {
    firebase.auth().signOut()
      .then(result => {
        dispatch({type: "USER_LOGOUT"})
        console.log("User Logged Out!");
      })
  }
}