import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import scriptLoader from 'react-async-script-loader';
import { connect } from 'react-redux';
import { fetchAnimal } from './actions/animalsActions';

let google
let map
let marker
let Animal

function FormatGender(gender) {
	return (
		<div>
			{gender === "f" ? "Female" : "Male"}
		</div>
	)
}

function FormatDate() {
	let date = "2015-07-04"
	let d = new Date(date + 'T05:00:00Z');
}

class Detail extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		let searchParams = this.props.location.search;
		let id = searchParams.slice(searchParams.indexOf('?id=') + 4);
		// let animalID = this.props.match.params.Id;
		this.props.dispatch(fetchAnimal(id));
	}

	shouldComponentUpdate(nextProps) {
		return (this.props.Animal.Location != nextProps.Animal.Location)
	}

	componentWillUpdate (nextProps, nextState) {
		let { isScriptLoaded, isScriptLoadSucceed } = this.props;
		console.log(this.props.Animal)
		
		if (isScriptLoaded && isScriptLoadSucceed) { // load finished
			google = window.google;
			map = new google.maps.Map(this.refs.map, {
				zoom: 12,
				gestureHandling: 'greedy',
				center: {
						lat: 36.170295,
						lng: -86.674846
				}
			})
		}
	}	

	render() {
		Animal = this.props.Animal;
		let loc = Animal.Type === "dog" ? "/dog/update?id" + Animal.Id : "/cat/update?id=" + Animal.Id;
		
		return(
			<div className="content">
				<Navigation/>
				<div className="detail">
					<div className="detail__main">
						<h2 className="detail__main__status">{Animal.Status}</h2>
							<h2 className="detail__main__status"> {FormatDate(Animal.Date)}</h2>
						<div>Near</div>
							<p className="detail__main__location">{Animal.Location}</p>
							<img className="detail__main__image" src={Animal.Image} alt="" />
						</div>
						<div ref="map" id="map" style={{height: "250px", width:"100%"}}></div>
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
			</div>
		)
	}
}



const LoadConnector = connect(state => {
  return{
  	Animal: state.animal
  }
})(Detail)

export default scriptLoader(["https://maps.googleapis.com/maps/api/js?key=AIzaSyDiUupl6Z9qBY5J_IKupr44xM542C23Xiw&libraries=geometry"])(LoadConnector)