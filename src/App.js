import React, { Component } from 'react';
import { 
	BrowserRouter as Router, 
	Route,
	Switch 
} from 'react-router-dom';
import './App.css';
import Add from './AddNewAnimal/';
import Detail from './Detail';
import Landing from './Landing';
import List from './List';
import Update from './Update';
import ScrollToTop from './ScrollToTop';
import Login from './Login/';
import RegionGmap from './GoogleMap/RegionGmap';

let views = false

class App extends Component {
	constructor(props) {
		super(props)
		this.incrementViews = this.incrementViews.bind(this)
	}

	incrementViews() {
		views = true;
	}

	render() {
		return (
			<Router>
				<ScrollToTop>
					<Switch>
						<Route path="/regions" component={RegionGmap} />
						<Route path="/list" component={List} />
						<Route path="/dog/details/:id" component={Detail} />
						<Route path="/cat/details/:id" component={Detail} />
						<Route path="/add" component={Add} />
						<Route path="/dog/update/:id" component={Update} />
						<Route path="/cat/update/:id" component={Update} />
						<Route path="/login" component={Login} />>		
						<Route path="/" component={() => (<Landing views={views} incrementViews={this.incrementViews}/>)}/>
					</Switch>
				</ScrollToTop>
			</Router>
		);
	}
}

export default App;
