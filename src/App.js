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
			Animal: {}
		}
		this.switchPage = this.switchPage.bind(this);
		this.getDetails = this.getDetails.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.pushToFirebase = this.pushToFirebase.bind(this);
		this.addAnimal = this.addAnimal.bind(this);
	}

	componentWillMount() {  
		this.firebaseRef = firebase.database().ref("Animals");
		this.firebaseRef.on('value', function(dataSnapshot) {
		var Animals = [];
		dataSnapshot.forEach(function(childSnapshot) {
			var Animal = childSnapshot.val();
			Animal['key'] = childSnapshot.key;
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

	getDetails(animal) {
		this.setState({
			Animal: animal,
			ActivePage: "Detail"
		})
	}

	addAnimal(animal) {
		this.firebaseRef.push(animal);
		this.setState({
			ActivePage: "List"
		})
	}

	updateAnimal(animal) {
		this.firebaseRef.push(animal);
		this.setState({
			ActivePage: "List"
		})
	}

  	render() {
		
    	return (
      	<div className="App">			
			{this.state.ActivePage === "Landing" ?
				<Landing switchPage={this.switchPage} getDetails={this.getDetails} Animals={this.state.Animals}/> :
			this.state.ActivePage === "List" ?
				<List switchPage={this.switchPage} Animals={this.state.Animals}/> :
			this.state.ActivePage === "Detail" ?
				<Detail Animal={this.state.Animal}/> :
			this.state.ActivePage === "Add" ?
				<Add switchPage={this.switchPage} send={this.send}/> :
				<Update />
			}
      	</div>
    	);
  	}
}

export default App;
