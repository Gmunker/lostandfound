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
			Animal: {},
			filteredAnimals: []
		}
		this.switchPage = this.switchPage.bind(this);
		this.getDetails = this.getDetails.bind(this);
		this.handleChange = this.handleChange.bind(this);
		// this.pushToFirebase = this.pushToFirebase.bind(this);
		this.addAnimal = this.addAnimal.bind(this);
		this.listFilter = this.listFilter.bind(this);
		this.navSwitch = this.navSwitch.bind(this);
		this.deleteAnimal = this.deleteAnimal.bind(this);
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
		}, () => {
			this.listFilter();
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

	// pushToFirebase(event) {
	// 	event.preventDefault();
	// 	this.firebaseRef.push({
	// 		text: this.state.text
	// 	});
	// 	this.setState({
	// 		text: ""
	// 	});
	// }

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

	deleteAnimal(event) {
		event.preventDefault();
		this.firebaseRef.child(this.state.Animal.key).remove(this.setState({
				ActivePage: "List",
				Animal: {}
			})
		)
	}

	updateAnimal(event) {
		event.preventDefault();
		this.firebaseRef.child(this.state.Animal.key).update(this.state.Animal, this.setState({
				ActivePage: "List",
				Animal: {}
			})
		)
	}

	listFilter(type="dog", status="lost") {
		var filteredArray = this.state.Animals.filter((Animal) => {
			return ((Animal.Type === type) && (Animal.Status === status));
		})
		this.setState({
			filteredAnimals: filteredArray
		})
	}

	navSwitch(page) {
		this.setState({ActivePage: page}, () => {
			if(this.state.ActivePage === "List") {
				this.listFilter();
			}
		})
	}

  	render() {
    	return (
      	<div className="App">			
			{this.state.ActivePage === "Landing" ?
				<Landing navSwitch={this.navSwitch} switchPage={this.switchPage} getDetails={this.getDetails} Animals={this.state.Animals}/> :
			this.state.ActivePage === "List" ?
				<List navSwitch={this.navSwitch} listFilter={this.listFilter} switchPage={this.switchPage} Animals={this.state.filteredAnimals} getDetails={this.getDetails}/> :
			this.state.ActivePage === "Detail" ?
				<Detail navSwitch={this.navSwitch} switchPage={this.switchPage} Animal={this.state.Animal}/> :
			this.state.ActivePage === "Add" ?
				<Add navSwitch={this.navSwitch} switchPage={this.switchPage} addAnimal={this.addAnimal}/> :
				<Update navSwitch={this.navSwitch} Animal={this.state.Animal} deleteAnimal={this.deleteAnimal}/>
			}
      	</div>
    	);
  	}
}

export default App;
