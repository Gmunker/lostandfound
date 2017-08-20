import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import scriptLoader from 'react-async-script-loader';
import { connect } from 'react-redux';
import { fetchAnimal } from './actions/animalsActions';

let google
let map
let marker

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
		return (this.props.animal.history[0].region != nextProps.animal.history[0].region)
	}

	componentWillUpdate (nextProps, nextState) {
		let { isScriptLoaded, isScriptLoadSucceed } = this.props;
		console.log(this.props.animal)
		
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
		let animal = this.props.animal;
		let loc = animal.type === "dog" ? "/dog/update?id" + animal.id : "/cat/update?id=" + animal.id;
		
		return(
			<div className="content">
				<Navigation/>
				<div className="detail">
					<div className="detail__main">
						<h2 className="detail__main__status">{animal.history[0].status}</h2>
							<h2 className="detail__main__status"> {FormatDate(animal.Date)}</h2>
						<div>Near</div>
							<p className="detail__main__location">{animal.history[0].region}</p>
							<img className="detail__main__image" src={animal.Image} alt="" />
						</div>
						<div ref="map" id="map" style={{height: "250px", width:"100%"}}></div>
						<div className="detail__sub">
							<div className="detail__sub__name">{animal.name}</div>
							<div className="detail__sub__color">{animal.color}</div>
							<div className="detail__sub__gender">
								{FormatGender(animal.gender)}
							</div>
							<div className="detail__sub__breed">{animal.breed}</div>
							<Link className="Button" to={loc}>Update</Link>
						</div>
				</div>
			</div>
		)
	}
}



const LoadConnector = connect(state => {
  return{
  	animal: state.animal
  }
})(Detail)

export default scriptLoader(["https://maps.googleapis.com/maps/api/js?key=AIzaSyDiUupl6Z9qBY5J_IKupr44xM542C23Xiw&libraries=geometry"])(LoadConnector)