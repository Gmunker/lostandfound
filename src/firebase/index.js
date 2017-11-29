import firebase from 'firebase';

const config = {
  	apiKey: "AIzaSyChKSzluTzhjX5VJxVqFF5zWzaFeWNScR8",
  	authDomain: "api-project-802443824988.firebaseapp.com",
	databaseURL: "https://api-project-802443824988.firebaseio.com",
	storageBucket: "gs://api-project-802443824988.appspot.com/"
};

firebase.initializeApp(config);

export default firebase;