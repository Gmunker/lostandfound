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
		let searchParams = this.props.location.search;
		let id = searchParams.slice(searchParams.indexOf('?id=') + 4);
			// let animalID = this.props.match.params.Id;
			this.props.dispatch(fetchAnimal(id));
	}

	render() {
		let Animal = this.props.Animal;
		let loc = Animal.Type === "dog" ? "/dog/update?id" + Animal.Id : "/cat/update?id=" + Animal.Id;
		const CurrentAnimal = () => {
			return(
				<div className="detail">
					<div className="detail__main">
						<h2 className="detail__main__status">{Animal.Status}</h2>
							<h2 className="detail__main__status"> {Animal.Date}</h2>
						<div>Near</div>
							<p className="detail__main__location">{Animal.Location}</p>
							<img className="detail__main__image" src={Animal.Image} alt="" />
						</div>
						<div className="detail__sub">
							<div className="detail__sub__name">{Animal.Name}</div>
							<div className="detail__sub__color">{Animal.Color}</div>
							<div className="detail__sub__gender">
								{FormatGender(Animal.Gender)}
							</div>
							<div className="detail__sub__breed">{Animal.Breed}</div>
							<Link className="Button" to={loc}>Update</Link>
						</div>
				</div>
			)
		}

		return(
			<div className="content">
				<Navigation/>
				{Animal ? <CurrentAnimal /> : <h1>Loading...</h1>}
			</div>
		)	
	}
}

export default connect(state => {
  return{
  	Animal: state.animals.animal
  }
})(Detail);