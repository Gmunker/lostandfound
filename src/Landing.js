import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './images/logo.jpg';
import { connect } from 'react-redux';
import { fetchAnimals } from './actions/animalsActions';
import { fetchAnimalsWithPics } from './actions/animalsActions';

class Landing extends Component {

	componentWillMount() {
		this.props.dispatch(fetchAnimals());
		this.props.dispatch(fetchAnimalsWithPics());
	}

	componentWillUnmount() {
		this.props.incrementViews()
	}

	render() {
		let randomAnimals = () => {
			if(Object.keys(this.props.animalsWithPics).length > 0) {
				return this.props.animalsWithPics.values.map((url, index) => {
					let currentKey = this.props.animalsWithPics.keys[index]
					return (
					<Link className={"dogImages__image" + (index + 1)} key={currentKey} to={"/dog/details/" + currentKey}>
					<img className={"dogImages__image1" + (index + 1)} src={url} alt={`${currentKey}`} />
					</Link>
					)
				})
			}
		}
		return(
			<div className="landingContent">
				<div className="topContainer">
					<img className="logo" src={logo} alt=""/>
					<div className={this.props.views ? "dogImages" : "dogImages first"}>
						{randomAnimals()}	
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
