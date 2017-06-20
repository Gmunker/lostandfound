import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';

class App extends Component {
  	render() {
    	return (
      	<div className="App">
        	<Header />
        	<div>
				This is the Content Area
			</div>
        	<Footer />
      	</div>
    	);
  	}
}

export default App;
