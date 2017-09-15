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
			return this.props.animalsWithPics.map((animal, index) => {
					return (
					<Link className={"dogImages__image" + (index + 1)} key={animal.id} to={"/dog/details/" + animal.id}>
						<img className={"dogImages__image1" + (index + 1)} src={animal.image} alt={`${animal.name} ${animal.type} ${animal.breed} ${animal.color} ${animal.sex} ${animal.Location}`} />
					</Link>
				)
			})
		}
		return(
			<div className="landingContent">
				<div className="topContainer">
					<img className="logo" src={logo} alt=""/>
					<div className={this.props.views ? "dogImages" : "dogImages first"}>
						{this.props.animalsWithPics.length > 0 ? randomAnimals() : null }		
					</div>
				</div>
				<nav className="pageNavigation">
					<Link className="Button" to={"/list"}>View Full List </Link>
					<Link className="Button" to={"/add"}>Add New Animal</Link>
					<Link className="textLink" to={"/login"}>Volunteer Login &rarr;</Link>
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
