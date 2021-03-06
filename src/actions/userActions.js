import firebase from "../firebase"

export function login(email, password) {
	return function(dispatch) {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(result => {
				dispatch({ type: "USER_LOGIN", payload: result.uid })
			})
			.catch(error => {
				let errorCode = error.code
				let errorMessage = error.message
				if (errorCode === "auth/wrong-password") {
					alert("Wrong password.")
				} else {
					alert(errorMessage)
				}
				console.log(error)
			})
	}
}

export function checkAuth() {
	return function(dispatch) {
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				console.log("Active User")
				dispatch({ type: "USER_LOGIN", payload: user.uid })
			} else {
				console.log("No Active User")
				return null
			}
		})
	}
}

export function logout() {
	return function(dispatch) {
		firebase
			.auth()
			.signOut()
			.then(result => {
				dispatch({ type: "USER_LOGOUT" })
				console.log("User Logged Out!")
			})
	}
}
