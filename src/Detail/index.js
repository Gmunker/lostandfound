import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navigation from '../Navigation';
import scriptLoader from 'react-async-script-loader';
import { connect } from 'react-redux';
import { currentAnimal } from '../actions/animalActions';
import { fetchAnimal } from '../actions/animalsActions';
import DetailContent from './Detail';

let google
let map
let marker

class Detail extends Component {
	constructor(props) {
		super(props)
		this.state = {
			activeIndex: 0,
			activeRegion: null
		}
		this.handleClick = this.handleClick.bind(this)
	}

    // Lifecycle Methods
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
		if(positionHistory.length > 0) {
			map = new google.maps.Map(this.map, {
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
		} else {
			map = new google.maps.Map(this.map, {
				zoom: 12,
				gestureHandling: 'greedy',
				disableDefaultUI: true,
				fullscreenControl: true,
				clickableIcons: false,
				center: {
					lat: 36.170295,
					lng: -86.674846
				}
			})
		}
		let arrLength = positionHistory.length;
		positionHistory.map((event, index) => {
			let customMarker = {
				url: require(`../images/mapIcons/${positionHistory[index].status}${animal.type}IconLabel.png`),
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

    // Map Methods
	handleClick(index, latLng, region) {
		this.setState({
			activeIndex: index,
			activeRegion: region
		}, () => {
            map ?
            map.panTo(latLng) :
            null
		})
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
            let Props = {
                animal: this.props.currentAnimal,
                activeRegion: this.state.activeRegion,
                activeIndex: this.state.activeIndex,
                map: input => this.map = input,
                handleClick: this.handleClick
            }
			return(
				<div className="content">
					<Navigation/>
                    <DetailContent Props={Props}/>
				</div>
			)
		}
	}
}

const LoadConnector = connect(state => {
    return{
        currentAnimal: state.animal.currentAnimal
    }
})(Detail)

export default scriptLoader(["https://maps.googleapis.com/maps/api/js?key=AIzaSyDiUupl6Z9qBY5J_IKupr44xM542C23Xiw&libraries=geometry"])(LoadConnector)