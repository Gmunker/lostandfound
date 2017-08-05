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
import Update from './Update';
import ScrollToTop from './ScrollToTop';
import Login from './Login';

import Gmap from './GoogleMap/Gmap';

class App extends Component {

	render() {
		return (
			<Router>
				<ScrollToTop>
					<Switch>
						<Route path="/map" component={Gmap} />
						<Route path="/list" component={List} />
						<Route path="/dog/details" component={Detail} />
						<Route path="/cat/details" component={Detail} />
						<Route path="/add" component={Add} />
						<Route path="/dog/update" component={Update} />
						<Route path="/cat/update" component={Update} />
						<Route path="/login" component={Login} />>		
						<Route path="/" component={Landing}/>
					</Switch>
				</ScrollToTop>
			</Router>
		);
	}
}

export default App;

