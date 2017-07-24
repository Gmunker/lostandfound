import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
// import dateFormat from 'dateformat';

import { connect } from 'react-redux';
import { fetchAnimal } from './actions/animalsActions';

function FormatGender(gender) {
	return (
		<div>
			{gender === "f" ? "Female" : "Male"}
		</div>
	)
}



class Detail extends Component {

	componentWillMount() {
			let animalID = this.props.match.params.Id;
			this.props.dispatch(fetchAnimal(animalID));
	}

	render() {
		
		const CurrentAnimal = () => {
			return(
				<div className="detail">
					<div className="detail__main">
						<h2 className="detail__main__status">{this.props.Animal.Status}</h2>
							<h2 className="detail__main__status"> {this.props.Animal.Date}</h2>
						<div>Near</div>
							<p className="detail__main__location">{this.props.Animal.Location}</p>
							<img className="detail__main__image" src={this.props.Animal.Image} alt="" />
						</div>
						<div className="detail__sub">
							<div className="detail__sub__name">{this.props.Animal.Name}</div>
							<div className="detail__sub__color">{this.props.Animal.Color}</div>
							<div className="detail__sub__gender">
								{FormatGender(this.props.Animal.Gender)}
							</div>
							<div className="detail__sub__breed">{this.props.Animal.Breed}</div>
							<Link className="Button" to={"/update/" + this.props.Animal.Id}>Update</Link>
						</div>
				</div>
			)
		}

		return(
			<div className="content">
				<Navigation/>
				{this.props.Animal ? <CurrentAnimal /> : <h1>Loading...</h1>}
			</div>
		)	
	}
}

export default connect(state => {
  return{
  	Animal: state.animals.animal
  }
})(Detail);