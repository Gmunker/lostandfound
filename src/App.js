import React, { Component } from 'react';
import { 
	BrowserRouter as Router, 
	Route,
	Switch 
} from 'react-router-dom';
import './App.css';

import Add from './Add';
import Detail from './Detail';
import Landing from './Landing';
import List from './List';
import Navigation from './Navigation';
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
			console.log(this.props);
    	return (
		<Router>
			<Switch>
				<Route path="/list" component={List} />
				<Route path="/detail/:Id" component={Detail}/>
				<Route path="/detail" />
				
				<Route path="/add" component={Add} />
				<Route path="/update/:Id" component={Update} />
				
				<Route path="/login"/>		
				<Route path="/" component={Landing}/>
			</Switch>
		</Router>
    	);
  	}
}

export default App;

