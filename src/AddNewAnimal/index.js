import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navigation from '../Navigation';
import { connect } from 'react-redux';
import regions from '../GoogleMap/geojson.json';
import { addAnimal } from '../actions/firebaseActions';
import { currentAnimal, setNewHistory } from '../actions/animalActions';
import scriptLoader from 'react-async-script-loader';
import AddAnimalForm from './Add';

let google
let map
let marker
let currentPoly

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            pos: null,
            sex: "male",
            status: "lost",
            name: ""
        };
        this.handleStatus = this.handleStatus.bind(this);
        this.handleSex = this.handleSex.bind(this);
        this.handleType = this.handleType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleColor = this.handleColor.bind(this);
        this.handleBreed = this.handleBreed.bind(this);
        this.placeMarkerAndPanTo = this.placeMarkerAndPanTo.bind(this);
        this.findRegion = this.findRegion.bind(this);
        this.replaceMarkerIcon = this.replaceMarkerIcon.bind(this);
    }

    // Lifecycle Methods
    componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
        if(google === undefined) {
            if (isScriptLoaded && isScriptLoadSucceed) {
                google = window.google
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
                map.addListener('click', function(e) {
                    this.findRegion(e.latLng, google);
                    
                    this.placeMarkerAndPanTo(e.latLng, map);
                }.bind(this));
            }
        }
    }

    componentWillUnmount() {
        google = undefined
    }
    
    handleName(e) {
        this.props.dispatch(currentAnimal({
            ...this.props.currentAnimal,
            name: e.target.value,
        }))
    }

    handleColor(e) {
        this.props.dispatch(currentAnimal({
            ...this.props.currentAnimal,
            color: e.target.value,
        }))
    }

    handleBreed(e) {
        this.props.dispatch(currentAnimal({
            ...this.props.currentAnimal,
            breed: e.target.value,
        }))
    }

    handleStatus(status) {
        console.log(status)
        this.props.dispatch(setNewHistory({
            ...this.props.newHistory,
            status
        }))
        
        if(marker && status !== "transferred") {
            let location = new google.maps.LatLng(this.props.newHistory.lat, this.props.newHistory.lng)
            this.replaceMarkerIcon(location, map, status, this.props.currentAnimal.type)
        }
    }

    handleType(e) {
        let type = e.currentTarget.name === "type" ? e.currentTarget.value : null;
        this.props.dispatch(currentAnimal({
            ...this.props.currentAnimal,
            type
        }));
        
        if(marker) {
            let location = new google.maps.LatLng(this.props.newHistory.lat, this.props.newHistory.lng)
            this.replaceMarkerIcon(location, map, this.props.newHistory.status, type)
        }
    }

    handleSex(sex) {
        this.props.dispatch(setNewHistory({
            ...this.props.newHistory,
            sex
        }))
    }

    handleSubmit(e) {
        e.preventDefault();
        let date = new Date().getTime()
        let setInitialHistory = new Promise((resolve, reject) => {
            this.props.currentAnimal.history = {};
            this.props.currentAnimal.history[date] = this.props.newHistory
            this.props.currentAnimal.history[date] ? resolve() : reject()
        })

        setInitialHistory
            .then(() => {
                this.setState({redirect: true})
                this.props.dispatch(addAnimal(this.props.currentAnimal))
            }).catch((e) => e)
    }
    
    // Map Methods
    replaceMarkerIcon(latLng, map, status, type) {
        marker.setMap(null)
        marker = new google.maps.Marker({
            position: latLng,
            map,
            icon: require(`../images/mapIcons/${status}${type}Icon.png`)
        });
    }

    placeMarkerAndPanTo(latLng, map) {
        if(marker !== undefined) {
            marker.setMap(null)
        }
        marker = new google.maps.Marker({
            position: latLng,
            map,
            icon: require(`../images/mapIcons/${this.props.newHistory.status}${this.props.currentAnimal.type}Icon.png`)
        });
        map.panTo(latLng);
    }

    findRegion(latLng, google) {
        let regionName;

        regions.map((region, i) => {
            currentPoly = new google.maps.Polygon({paths: region.polygon})
            if(google.maps.geometry.poly.containsLocation(latLng, currentPoly)) {
                regionName = region.name
            }
        })

        let region = regionName !== undefined ? regionName : "Outside Defined Regions"
        this.props.dispatch(setNewHistory({
            ...this.props.newHistory,
            lat: latLng.lat(),
            lng: latLng.lng(),
            region: region,
            date: new Date()
        }))
    }    

    render() {
        
        let addProps = {
            handleStatus: this.handleStatus, 
            handleType: this.handleType,
            handleName: this.handleName,
            handleSex: this.handleSex,
            handleColor: this.handleColor,
            handleBreed: this.handleBreed,
            handleSubmit: this.handleSubmit,
            findRegion: this.findRegion,
            placeMarkerAndPanTo: this.placeMarkerAndPanTo, 
            replaceMarkerIcon: this.replaceMarkerIcon, 
            map: input => this.map = input,
            newAnimal: this.props.currentAnimal,
            newHistory: this.props.newHistory
        }

        return(
            <div className="addContent content">
                <Navigation/>
                <AddAnimalForm Props={addProps}/>
                {this.state.redirect ? <Redirect to="/list" /> : null}
            </div>
        )
    }
}

const LoadConnector = connect(state => {
    return {
        currentAnimal: state.animal.currentAnimal,
        newHistory: state.animal.newHistory
    }
})(Add)

export default scriptLoader(["https://maps.googleapis.com/maps/api/js?key=AIzaSyDiUupl6Z9qBY5J_IKupr44xM542C23Xiw&libraries=geometry"])(LoadConnector)
