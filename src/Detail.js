import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import scriptLoader from 'react-async-script-loader';
import { connect } from 'react-redux';
import { animalInfo } from './actions/animalActions';
import { fetchAnimal } from './actions/animalsActions';

const baseUrl = 'https://raw.githubusercontent.com/m-madden/lostandfound/master/';
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
		return this.props.animal.history.length
	}

	componentWillUpdate (nextProps, nextState) {
		let { isScriptLoaded, isScriptLoadSucceed } = nextProps;
		let animalHistory = nextProps.animal.history.sort(function(a,b) {
			return new Date(b.date) - new Date(a.date)
		})
		
		if (isScriptLoaded && isScriptLoadSucceed) { // load finished
			google = window.google;
			map = new google.maps.Map(this.refs.map, {
				zoom: 14,
				gestureHandling: 'greedy',
				disableDefaultUI: true,
				fullscreenControl: true,
				center: {
						lat: animalHistory[0].lat,
						lng: animalHistory[0].lng
				}
			})
			let arrLength = animalHistory.length;
			animalHistory.map((event, index) => {
				marker = new google.maps.Marker({
					position: {
						lat: event.lat,
						lng: event.lng
					},
					map,
					icon: {
						path: google.maps.SymbolPath.CIRCLE,
						scale: 15,
						strokeWeight: 0,
						fillColor: event.status === "lost" ? "red" : "green",
						fillOpacity: 0.4
					},
					label: arrLength.toString()
				})
				arrLength -= 1
			})
		}
	}

	componentWillUnmount() {
		this.props.dispatch(animalInfo({history: [{status: "lost"}], type: "dog"}))
	}

	render() {
		let animal = this.props.animal;
		let loc = animal.type === "dog" ? "/dog/update?id" + animal.id : "/cat/update?id=" + animal.id;

		
// I'm assuming this is for the history list to compliment the markers, this will need a conditional for when it's actually populated. This is the cause of the error you were finding. 
		// const eventList = animal.history.map((event, index) => {
		// 	return(
		// 		<div>
		// 			<span>Index</span>
		// 			<span>Month - date - time</span>
		// 			<span>Status</span>
		// 		</div>
		// 	)
		// })


		return(
			<div className="content">
				<Navigation/>
				<div className="detail">
					<div className="detail__main">
						<h2 className="detail__main__status">{animal.history[0].status ? animal.history[0].status : null}</h2>
						<h2 className="detail__main__status"> {animal.history[0].date ? animal.history[0].date : null }</h2>
						<div>{animal.history[0].region === "Outside Defined Regions" ? null : "In the Region:"}</div>
							<p className="detail__main__location">{animal.history[0].region ? animal.history[0].region : null}</p>
							<img className="detail__main__image" src={animal.Image ? animal.Image : null} alt="" />
					</div>
					<div ref="map" id="map" style={{height: "250px", width:"100%"}}></div>
					<div className="detail__sub">
						<div className="detail__sub__name">{animal.name ? animal.name : "No Name Provided"}</div>
						<div className="detail__sub__color">{animal.color ? animal.color : "No Color Provided"}</div>
						
						
						<div className="detail__sub__gender">
							{FormatGender(animal.gender)}
						</div>
						
						
						<div className="detail__sub__breed">{animal.breed ? animal.breed : "No Breed Provided"}</div>
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