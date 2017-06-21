import React, { Component } from 'react';
import './App.css';
import Landing from './Landing';
import Detail from './Detail';
import Add from './Add';
import List from './List';
import Update from './Update';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ActivePage: "Landing",
		}
		this.switchPage = this.switchPage.bind(this);
		this.getAnimalInfo = this.getAnimalInfo.bind(this);
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
    	return (
      	<div className="App">
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
