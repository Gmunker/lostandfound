import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navigation from '../Navigation';
import { connect } from 'react-redux';
import regions from '../GoogleMap/geojson.json';
import { addAnimal } from '../actions/firebaseActions';
import { currentAnimal, setNewHistory } from '../actions/animalActions';
import scriptLoader from 'react-async-script-loader';
import AddAnimalForm from './Add';
import superagent from 'superagent';
import firebase from 'firebase';
let firebaseRef = firebase.database().ref("HipD");

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
            name: "",
            showImageUploader: false,
            files: []
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
        this.imageUploadClick = this.imageUploadClick.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.cancel = this.cancel.bind(this);
        this.removeImage = this.removeImage.bind(this);
        this.makeFeatured = this.makeFeatured.bind(this);
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

    // Image Methods
    imageUploadClick() {
        this.setState({
            showImageUploader: !this.state.showImageUploader
        })
    }

    onDrop(newFiles) {
        let oldFiles = this.state.files
        newFiles.map((file) => {
            oldFiles.push(file)
        })

        this.setState({
            files: oldFiles,
            showImageUploader: false
        })
    }

    cancel() {
        this.setState({
            showImageUploader: false
        })
    }

    removeImage(index) {
        let files = this.state.files
        files.splice(index, 1);
        this.setState({
            files
        })
    }

    makeFeatured(index) {
        let files = this.state.files
        let feature = files[index]
        files.splice(index, 1)
        files.splice(0, 0, feature)
        this.setState({
            files
        })
    }

    // Form Methods    
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

        var myFiles = this.state.files

        let totalSize = 0
        myFiles.map((file) => {
            totalSize += file.size
            console.log(file.size)
        })

        console.log("Total Size: " + totalSize)
        
        let date = new Date().getTime()
        let setInitialHistory = new Promise((resolve, reject) => {
            this.props.currentAnimal.history = {};
            this.props.currentAnimal.history[date] = this.props.newHistory
            this.props.currentAnimal.history[date] ? resolve() : reject()
        })

        let fileNumber = 1
        let totalBytesTransferred = 0
        const uploadImageAsPromise = (imageFile, key) => {
            
            // let completed = false
            new Promise(function (resolve, reject) {
                // console.log(this)
                var storageRef = firebase.storage().ref(key+"/"+imageFile.name);
        
                // Upload file
                var task = storageRef.put(imageFile);
        
                // Update progress
                task.on('state_changed', function(snapshot) {
                    totalBytesTransferred += snapshot.bytesTransferred
                    
                    console.log("Total Transferred: " + totalBytesTransferred + " | Total Size: " + totalSize)
                    
                    let number = Math.round((totalBytesTransferred / totalSize) * 100);
                    document.getElementById("Submit").innerHTML = "Upload is " + number + "% done";
                }, function(error) {
        
                }, function(complete) {
                    if(fileNumber === myFiles.length) {
                        this.setState({redirect: true})
                    } else {
                        ++fileNumber
                    }
                }.bind(this))
            }.bind(this))
            
        }

        setInitialHistory.then(() => {
            let key = firebaseRef.push(this.props.currentAnimal).key;
            myFiles.map((file) => {
                uploadImageAsPromise(file, key)
            })

            // let key = firebaseRef.push(this.props.currentAnimal).key;
            
            // const storageRef = firebase.storage().ref(key + '/' + myFile.name);
            // let uploadTask = storageRef.put(myFile);

            // uploadTask.on('state_changed', function(snapshot){

            //     let progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            //     document.getElementById("Submit").innerHTML = "Upload is " + progress + "% done";

            // },function(error) {
            //     // Handle unsuccessful uploads
            //     console.log("Failure")
            // }, function() {
            //     // Handle successful uploads on complete
            //     this.setState({redirect: true})            
            // }.bind(this))
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
        let newAnimal = this.props.currentAnimal
        let newHistory = this.props.newHistory
        let Props = {
            Image: {
                onClick: this.imageUploadClick,
                showImageUploader: this.state.showImageUploader,
                onDrop: this.onDrop,
                files: this.state.files,
                cancel: this.cancel,
                removeImage: this.removeImage,
                makeFeatured: this.makeFeatured
            },
            Name: {
                label: "Name",
                name: "name",
                ref: "name",
                required: true,
                id: "name",
                onChange: this.handleName,
                value: newAnimal.name
            },
            Status: {
                options: [
                    "lost",
                    "found",
                    "transferred"
                ],
                selectProps: {
                    label: "Status",
                    onChange: this.handleStatus,
                    value: newHistory.status,
                    name: "status",
                    ref: "status",
                    id: "status"
                }
            },
            Type: {
                one: {
                    label: "Dog",
                    value: "dog",
                    id: "typeDog",
                    name: "type",
                    checked: newAnimal.type === "dog",
                    onChange: this.handleType
                },
                two: {
                    label: "Cat",
                    value: "cat",
                    id: "typeCat",
                    name: "type",
                    checked: newAnimal.type === "cat",
                    onChange: this.handleType
                }
            },
            Sex: {
                options: [
                    "male",
                    "female",
                    "neutered male",
                    "spayed female"
                ],
                selectProps: {
                    label: "Sex",
                    onChange: this.handleSex,
                    value: newHistory.sex,
                    name: "sex",
                    ref: "sex",
                    id: "sex"
                }
            },
            Color: {
                label: "Color",
                name: "color",
                ref: "color",
                required: true,
                id: "color",
                onChange: this.handleColor,
                value: newAnimal.color
            },
            Breed: {
                label: "Breed",
                name: "breed",
                ref: "breed",
                required: true,
                id: "breed",
                onChange: this.handleBreed,
                value: newAnimal.breed
            },
            Map: {
                typeText: newAnimal.type === "dog" ? "dog" : "cat",
                statusText: newHistory.status === "found" ? "found" : "last seen",
                regionName: newHistory.region,
                findRegion: this.findRegion,
                placeMarkerAndPanTo: this.placeMarkerAndPanTo, 
                replaceMarkerIcon: this.replaceMarkerIcon, 
                map: input => this.map = input,
            },
            Submit: {
                handleSubmit: this.handleSubmit
            }
        }

        return(
            <div className="addContent content">
                <Navigation/>
                <AddAnimalForm Props={Props}/>
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
