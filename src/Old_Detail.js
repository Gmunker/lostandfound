import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navigation from './Navigation';
import scriptLoader from 'react-async-script-loader';
import { connect } from 'react-redux';
import { currentAnimal } from './actions/animalActions';
import { fetchAnimal } from './actions/animalsActions';

let google
let map
let marker

let options = {  
    weekday: "short", year: "numeric", month: "short",  
    day: "numeric", hour: "2-digit", minute: "2-digit"
};

class Detail extends Component {
	constructor(props) {
		super(props)
		this.state = {
			activeIndex: 0,
			activeRegion: null
		}
		this.handleClick = this.handleClick.bind(this)
		this.panTo = this.panTo.bind(this)
	}

	componentWillMount() {
		let animalID = this.props.match.params.id
		this.props.dispatch(fetchAnimal(animalID))
	}

	shouldComponentUpdate(nextProps, nextState) {
		if ((nextProps.isScriptLoaded && nextProps.isScriptLoadSucceed) || (this.props.isScriptLoaded && this.props.isScriptLoadSucceed)) {
			if (nextProps.currentAnimal.history || this.props.currentAnimal.history) {
				return true
			} else {
				return false
			}
		} 
	}

	componentDidUpdate (nextProps, nextState) {
		let animal = this.props.currentAnimal
		let positionHistory = []
		animal.history.map((event, i) => {
			if(event.lat && event.lng) {
				positionHistory.push(event)
			}
		})
		google = window.google;
		map = new google.maps.Map(this.refs.map, {
			zoom: 14,
			gestureHandling: 'greedy',
			disableDefaultUI: true,
			fullscreenControl: true,
			clickableIcons: false,
			center: {
					lat: positionHistory[0].lat,
					lng: positionHistory[0].lng
			}
		})
		let arrLength = positionHistory.length;
		positionHistory.map((event, index) => {
			let customMarker = {
				url: require(`./images/mapIcons/${positionHistory[index].status}${animal.type}IconLabel.png`),
				size: new google.maps.Size(53, 40),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(21, 41),
				labelOrigin: new google.maps.Point(40, 16)
			}
			let markerLabel = arrLength.toString()
			marker = new google.maps.Marker({
				position: {
					lat: event.lat,
					lng: event.lng
				},
				map,
				icon: customMarker,
				label: {
					text: markerLabel,
					fontWeight: "bold"
				}
			})
			arrLength -= 1
		})
	}

	componentWillUnmount() {
		this.props.dispatch(currentAnimal({type: "dog"}))
		google = undefined
	}

	handleClick(index, latLng, region) {
		this.setState({
			activeIndex: index,
			activeRegion: region
		}, () => {
			this.panTo(latLng)
		})
	}

	panTo(latLng) {
		if(map) {
			map.panTo(latLng)
		}
	}

	render() {
		let animal = this.props.currentAnimal
		if (this.props.currentAnimal.animalNotFound === true ) {
			return (
					<Redirect to="/list" />
			)
		} else if(!animal.history) {
			return(
				<div>Loading...</div>
			)
		} else {
			let loc = animal.type === "dog" ? `/dog/update/${animal.id}` : `/cat/update/${animal.id}`;		
			let arrLength = animal.history.length
			let positionEvents = []
			animal.history.map((event) => {
				if (event.lat) {
					positionEvents.push(event)
				}
			})

			const eventList = animal.history.map((event, index) => {
				let eventIndex = arrLength - index
				let latLng = {
					lat: event.lat,
					lng: event.lng
				}
				return(
					<EventItem 
						key={index} 
						onClick={(event) => {this.handleClick(); this.panTo(latLng);}}
						index={index}
						isActive={this.state.activeIndex === index}
						event={event}
						eventIndex={eventIndex}
						latLng={latLng}
						handleClick={this.handleClick}
						panTo={this.panTo}
					/>
				)
			})
			return(
				<div className="content">
					<Navigation/>
					<div className="detail">
						<div className="detail__main">
						<div className="detail__sub__name">{animal.name ? animal.name : "No Name Provided"}</div>
						</div>
						<table className="detail__sub">
							<tbody>
								<tr>
									<td>Color</td>
									<td className="detail__sub__color">{animal.color ? animal.color : "No Color Provided"}</td>
								</tr>
								<tr>
									<td>Sex</td>
									<td className="detail__sub__gender">{animal.history[0].sex}</td>
								</tr>
								<tr>
									<td>Breed</td>
									<td className="detail__sub__breed">{animal.breed ? animal.breed : "No Breed Provided"}</td>
								</tr>
							</tbody>
						</table>
						<div className="mapRow">
							<div ref="map" id="map" style={{height: "250px", width:"100%"}}></div>
							<div className="detailList__region">
								<span>Area: &nbsp;{this.state.activeRegion}</span>
							</div>
							<table className="detailList">
								<tbody>
									{animal.history[0].lat !== null ? eventList : null}
								</tbody>
							</table>
						</div>
						<Link className="Button" to={animal.type === "dog" ? `/dog/update/${animal.id}` : `/cat/update/${animal.id}`}>Update</Link>
					</div>
				</div>
			)
		}
	}
}

class EventItem extends Component {
	componentWillMount() {
	}

	handleClick = () => {
		this.props.handleClick(this.props.index, this.props.latLng, this.props.event.region)
	}

	render() {
		return(
			<tr className={this.props.isActive ? "detailList__item active " + this.props.event.status : "detailList__item"}
				onClick={this.handleClick}
			>
				<td className="detailList__item__id">{this.props.eventIndex}</td>
				<td className="detailList__item__status">{this.props.event.status}</td>
				<td className="detailList__item__date">{new Date(this.props.event.date).toLocaleTimeString("en-us", options)}</td>
			</tr>
		)
	}
}

const LoadConnector = connect(state => {
  return{
		currentAnimal: state.animal.currentAnimal
  }
})(Detail)

export default scriptLoader(["https://maps.googleapis.com/maps/api/js?key=AIzaSyDiUupl6Z9qBY5J_IKupr44xM542C23Xiw&libraries=geometry"])(LoadConnector)