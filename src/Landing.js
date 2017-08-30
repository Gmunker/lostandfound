import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './images/logo.jpg';
import { connect } from 'react-redux';
import { fetchAnimals } from './actions/animalsActions';

class Landing extends Component {

	componentWillMount() {
		this.props.dispatch(fetchAnimals());
	}

	componentWillUnmount() {
		this.props.incrementViews()
	}

	render() {
		let randomAnimals = () => {
			return this.props.animalsWithPics.map((animal) => {
					return (
					<Link className="dogImages__image1" key={animal.Id} to={"/dog/details?id" + animal.Id}>
						<img className="dogImages__image1" src={animal.Image} alt={`${animal.Name} ${animal.Type} ${animal.Breed} ${animal.Color} ${animal.Gender} ${animal.Location}`} />
					</Link>
				)
			})
		}
		
		return(
			<div className="landingContent">
				<div className="topContainer">
					<img className="logo" src={logo} alt=""/>
					<div className="dogImages">
						{this.props.animalsWithPics.length > 0 ? randomAnimals() : null }		
					</div>
				</div>
				<nav className="pageNavigation">
					<Link className="Button" to="/list">View Full List</Link>
					<Link className="Button" to="/add">Add New Animal</Link>
					<Link className="Button" to="/login">Login</Link>
				</nav>
			</div>
		)
	}
}

export default connect(state => {
	return {
		animals: state.animals.animals,
		animalsWithPics: state.animalsWithPics
	}
})(Landing);
