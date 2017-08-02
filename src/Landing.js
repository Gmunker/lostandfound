import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './images/logo.jpg';

import { connect } from 'react-redux';
import { fetchAnimals } from './actions/animalsActions';


//create random pics based on if pic is aviliable
//link directly to /dog/details?id

class Landing extends Component {

	componentWillMount() {
		this.props.dispatch(fetchAnimals());
	}

	render() {

		let animalsWithPics = this.props.animals.filter((animal) => {
			return (animal.Image)
		})

		let getRandom = () => {
		let random = Math.round(Math.random() * animalsWithPics.length - 1);
			return animalsWithPics.splice(random, 1)
		}

		let one = getRandom();
		let two = getRandom();
		let three = getRandom();
		let four = getRandom();

		let randomAnimals = () => {
			return (
				<div className="dogImages">
						<Link className="dogImages__image1" to={"/dog/details?id" + one[0].Id}>
						<img className="dogImages__image1" src={one[0].Image} alt={`${one[0].Name} ${one[0].Type} ${one[0].Breed} ${one[0].Color} ${one[0].Gender} ${one[0].Location}`}/>
						</Link>
						<Link className="dogImages__image2" to={"/dog/details?id" + two[0].Id}  >
						<img className="dogImages__image2" src={two[0].Image} alt={`${two[0].Name} ${two[0].Type} ${two[0].Breed} ${two[0].Color} ${two[0].Gender} ${two[0].Location}`}/>
						</Link>
						<Link className="dogImages__image3" to={"/dog/details?id" + three[0].Id}>
						<img className="dogImages__image3" src={three[0].Image} alt={`${three[0].Name} ${three[0].Type} ${three[0].Breed} ${three[0].Color} ${three[0].Gender} ${three[0].Location}`}/>
						</Link>
						<Link className="dogImages__image4" to={"/dog/details?id" + four[0].Id}>
						<img className="dogImages__image4" src={four[0].Image} alt={`${four[0].Name} ${four[0].Type}, ${four[0].Breed}, ${four[0].Color}, ${four[0].Gender}, ${four[0].Location}`}/>
						</Link>
					</div>
			)
		}


		return(
			<div className="landingContent">
				<div className="topContainer">
					<img className="logo" src={logo} alt=""/>
					{/* {one[0] ? randomAnimals() : null} */}
				</div>
				<nav className="pageNavigation">
					<Link className="Button" to="/list">View Full List</Link>
					<Link className="Button" to="/add">Add New Animal</Link>
				</nav>
			</div>
		)
	}
}

export default connect(state => {
	return {
		animals: state.animals.animals
	}
})(Landing);
