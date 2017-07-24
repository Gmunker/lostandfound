import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';


import Landing from './Landing';
import Detail from './Detail';
import Add from './Add';
import List from './List';
import Update from './Update';
// import ScrollToTop from './ScrollToTop';
// import Login from './Login';

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
		this.deleteAnimal = this.deleteAnimal.bind(this);
		this.updateAnimal = this.updateAnimal.bind(this);
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

  	render() {
    	return (
		<Router>
			<div className="App"> 
				<Route exact path="/" render={() => <Landing Animals={this.state.Animals} getDetails={this.getDetails}/>}/>
				<Route exact path="/list" render={() => <List Animals={this.state.filteredAnimals} listFilter={this.listFilter} getDetails={this.getDetails}/>}/>	
				<Route exact path="/detail" render={() => <Detail Animal={this.state.Animal}/>}/>
				<Route exact path="/add" component={Add} />
				<Route exact path="/update" render={() => <Update Animal={this.state.Animal} deleteAnimal={this.deleteAnimal} updateAnimal={this.updateAnimal}/>}/>
				<Route exact path="/login"/>		
			</div>
		</Router>
    	);
  	}
}

export default App;

