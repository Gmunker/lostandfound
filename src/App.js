import React, { Component } from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Landing from './Landing';
import Detail from './Detail';
import Add from './Add';
import List from './List';
import Update from './Update';
import ScrollToTop from './ScrollToTop';
// import Login from './Login';

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
			Animal: {},
			filteredAnimals: []
		}
		this.getDetails = this.getDetails.bind(this);
		this.addAnimal = this.addAnimal.bind(this);
		this.listFilter = this.listFilter.bind(this);
		this.deleteAnimal = this.deleteAnimal.bind(this);
		this.updateAnimal = this.updateAnimal.bind(this);
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

	getDetails(animal) {
		this.setState({
			Animal: animal
		})
	}

	addAnimal(animal) {
		this.firebaseRef.push(animal);
	}

	deleteAnimal(key) {
		this.firebaseRef.child(key).remove(this.setState({
				Animal: {}
			})
		)
	}

	updateAnimal(animal, key) {
		this.firebaseRef.child(key).update(animal, this.setState({
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

  	render() {
    	return (
		<Router>
			<ScrollToTop>
			<div className="App"> 
				<Route exact path="/" render={() => <Landing Animals={this.state.Animals} getDetails={this.getDetails}/>}/>
				<Route exact path="/list" render={() => <List Animals={this.state.filteredAnimals} listFilter={this.listFilter} getDetails={this.getDetails}/>}/>	
				<Route exact path="/detail" render={() => <Detail Animal={this.state.Animal}/>}/>
				<Route exact path="/add" render={() => <Add addAnimal={this.addAnimal}/>}/>
				<Route exact path="/update" render={() => <Update Animal={this.state.Animal} deleteAnimal={this.deleteAnimal} updateAnimal={this.updateAnimal}/>}/>
				<Route exact path="/login"/>		
			</div>
			</ScrollToTop>
		</Router>
    	);
  	}
}

export default App;

