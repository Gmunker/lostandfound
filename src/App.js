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
// import ScrollToTop from './ScrollToTop';
// import Login from './Login';

class App extends Component {

	render() {
		console.log(this.props);
		return (
			<Router>
				<Switch>
					<Route path="/list" component={List} />
					<Route path="/detail/:Id" component={Detail}/>
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

