import React, { Component } from 'react';
import firebase from 'firebase';  
// import reactfire from 'reactfire';
import './App.css';
import Landing from './Landing';
import Detail from './Detail';
import Add from './Add';
import List from './List';
import Update from './Update';

const config = {
  	apiKey: "AIzaSyChKSzluTzhjX5VJxVqFF5zWzaFeWNScR8",
  	authDomain: "api-project-802443824988.firebaseapp.com",
  	databaseURL: "https://api-project-802443824988.firebaseio.com"
};

firebase.initializeApp(config);

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Animals: [],
			ActivePage: "Landing",
			text: ""
		}
		this.switchPage = this.switchPage.bind(this);
		this.getAnimalInfo = this.getAnimalInfo.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.pushToFirebase = this.pushToFirebase.bind(this);
	}

	componentWillMount() {  
		this.firebaseRef = firebase.database().ref("Animals");
		this.firebaseRef.on('value', function(dataSnapshot) {
		var Animals = [];
		dataSnapshot.forEach(function(childSnapshot) {
			var Animal = childSnapshot.val();
			Animal['.key'] = childSnapshot.key;
			Animals.push(Animal);
		});
		this.setState({
			Animals: Animals
		});
		}.bind(this));
	}

	componentWillUnmount() {  
		this.firebaseRef.off();
	}

	handleChange(event) {
		this.setState({
			text: event.target.value
		});
	}

	pushToFirebase(event) {
		event.preventDefault();
		this.firebaseRef.push({
			text: this.state.text
		});
		this.setState({
			text: ""
		});
	}

	switchPage(event) {
		this.setState({
			ActivePage: event.target.value
		})
	}

	getAnimalInfo(event) {
		return "Animal Info";
	}

  	render() {
		
		const Animals = this.state.Animals;
		const rows = Animals.map((Animal) => {
				return <p key={Animal.Id}>{Animal.Breed}</p>
		})

    	return (
      	<div className="App">
		  	<input value={this.state.text} onChange={this.handleChange}/>
			<button onClick={this.pushToFirebase}>Push to Firebase</button>
			{rows}
			{this.state.ActivePage === "Landing" ?
				<Landing switchPage={this.switchPage}/> :
			this.state.ActivePage === "List" ?
				<List /> :
			this.state.ActivePage === "Detail" ?
				<Detail info={this.getAnimalInfo}/> :
			this.state.ActivePage === "Add" ?
				<Add switchPage={this.switchPage}/> :
				<Update />
			}
      	</div>
    	);
  	}
}

export default App;
