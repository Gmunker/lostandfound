import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import scriptLoader from 'react-async-script-loader';
import { connect } from 'react-redux';
import { animalInfo, currentAnimal } from './actions/animalActions';
import { fetchAnimal } from './actions/animalsActions';

const iconUrl = '/images/mapIcons/'
let google
let map
let marker

var options = {  
    weekday: "short", year: "numeric", month: "short",  
    day: "numeric", hour: "2-digit", minute: "2-digit"
};

class Detail extends Component {
	constructor(props) {
		super(props)
		this.state = {
			activeIndex: null,
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
		// let { isScriptLoaded, isScriptLoadSucceed } = nextProps;
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
		google = window.google;
		map = new google.maps.Map(this.refs.map, {
			zoom: 14,
			gestureHandling: 'greedy',
			disableDefaultUI: true,
			fullscreenControl: true,
			center: {
					lat: animal.history[0].lat,
					lng: animal.history[0].lng
			}
		})
		let arrLength = animal.history.length;
		animal.history.map((event, index) => {
			var customMarker = {
				url: require(`./images/mapIcons/${animal.history[index].status}${animal.type}IconLabel.png`),
				size: new google.maps.Size(53, 40),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(21, 41),
				labelOrigin: new google.maps.Point(40, 16)
			}
			var markerLabel = arrLength.toString()
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
		if(!animal.history) {
			return(
				<div>Loading...</div>
			)
		} else {
			let loc = animal.type === "dog" ? `/dog/update/${animal.id}` : `/cat/update/${animal.id}`;		
			let arrLength = animal.history.length
			const eventList = animal.history.map((event, index) => {
				var eventIndex = arrLength - index
				var latLng = {
					lat: event.lat,
					lng: event.lng
				}
				var zeroEvent
				if (animal.history[0].region !== undefined) {
					zeroEvent = animal.history[0]
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
							zeroEvent={zeroEvent}
						/>
					)
				}
			})
			return(
				<div className="content">
					<Navigation/>
					<div className="detail">
						<div className="detail__main">
						<div className="detail__sub__name">{animal.name ? animal.name : "No Name Provided"}</div>
							{/* <div>{animal.history[0].region === "Outside Defined Regions" ? null : "In the Region:"}</div> */}
							{/* <p className="detail__main__location">{animal.history[0].region ? animal.history[0].region : null}</p> */}
							{/* <img className="detail__main__image" src={animal.Image ? animal.Image : null} alt="" /> */}
						</div>
						<div className="detail__sub">
							<div className="detail__sub__color">{animal.color ? animal.color : "No Color Provided"}</div>
							<div className="detail__sub__gender">
								{animal.history.sex}
							</div>
							<div className="detail__sub__breed">{animal.breed ? animal.breed : "No Breed Provided"}</div>
						</div>
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
						<Link className="Button" to={loc}>Update</Link>
					</div>
				</div>
			)
		}
	}
}

class EventItem extends Component {
	componentDidMount() {
		if (this.props.zeroEvent) {
			var zeroEvent = this.props.zeroEvent
			var zeroLatLng = {
				lat: zeroEvent.lat,
				lng: zeroEvent.lng
			}
			var zeroRegion = zeroEvent.region
			this.props.handleClick(0, zeroLatLng, zeroRegion)
		}
	}

	handleClick = () => {
		this.props.handleClick(this.props.index, this.props.latLng, this.props.event.region)
	}

	render() {
		return(
			<tr className={this.props.isActive ? "detailList__item active " + this.props.event.status : "detailList__item"}
				onClick={this.handleClick}
			>
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