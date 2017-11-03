import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navigation from '../Navigation';
import { connect } from 'react-redux';
import regions from '../GoogleMap/geojson.json';
import { addAnimal } from '../actions/firebaseActions';
import { currentAnimal, setNewHistory } from '../actions/animalActions';
import scriptLoader from 'react-async-script-loader';
import AddAnimalForm from './Add';
import firebase from 'firebase';
import Footer from '../Footer';

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
            showImageUploader: false,
            sex: "male",
            type: "dog",
            name: "",
            color: "",
            breed: "",
            images: [],
            status: "lost",
            lat: null,
            lng: null,
            region: ""
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

    componentWillMount() {
        if(!this.props.user.uid) {
            this.setState({redirect: true})
        }
    }

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

    onDrop(newfiles) {
        function compress(newfiles) {
            return new Promise(function(resolve, reject) {
                let compressedFiles = []
                let images = newfiles.map((img, index) => {
                    const image = new Image()
                    image.src = img.preview
                    image.onload = () => {

                        // Start image compression
                        const canvas = document.createElement('canvas')
                        let width = image.width
                        let height = image.height
                        let maxWidth = 1000
                        let maxHeight = 1000
                        let quality = 1.0
                        if (width > height) {
                            if (width > maxWidth) {
                                height = Math.round(height * maxWidth / width)
                                width = maxWidth
                            }
                        } else {
                            if (height > maxHeight) {
                                width = Math.round(width * maxHeight / height)
                                height = maxHeight
                            }
                        }
                        canvas.width = width
                        canvas.height = height
                        const ctx = canvas.getContext('2d')
                        ctx.drawImage(image, 0, 0, width, height)                        
                        canvas.toBlob(function(blob) {
                            const newImg = new Image()
                            newImg.src = URL.createObjectURL(blob)
                            blob.preview = newImg.src
                            blob.name = img.name
                            compressedFiles.push(blob)
                            console.log(newfiles.length + " | " + compressedFiles.length)
                            if(newfiles.length === compressedFiles.length) {
                                resolve(compressedFiles)
                            }
                        }, 'image/jpeg', 0.95)
                    }
                })
            })
        }

        compress(newfiles)
        .then(function(compressedFiles) {
            let currentImages = this.state.images
            this.setState({
                images: [...currentImages, ...compressedFiles],
                showImageUploader: false
            })
        }.bind(this))
    }

    cancel() {
        this.setState({
            showImageUploader: false
        })
    }

    removeImage(index) {
        let files = this.state.images
        files.splice(index, 1);
        this.setState({
            images: files
        })
    }

    makeFeatured(index) {
        let files = this.state.images
        let feature = files[index]
        files.splice(index, 1)
        files.splice(0, 0, feature)
        this.setState({
            images: files
        })
    }

    // Form Methods    
    handleName(e) {
        e.preventDefault()
        this.setState({
            name: e.currentTarget.value
        })
    }

    handleColor(e) {
        this.setState({
            color: e.currentTarget.value
        })
    }

    handleBreed(e) {
        this.setState({
            breed: e.currentTarget.value
        })
    }

    handleStatus(status) {
        this.setState({
            status
        }, () => {
            if(marker && status !== "transferred") {
                let location = new google.maps.LatLng(this.state.lat, this.state.lng)
                this.replaceMarkerIcon(location, map, status, this.state.type)
            }
        })
    }

    handleType(e) {
        this.setState({
            type: e.currentTarget.value
        }, () => {
            if(marker) {
                let location = new google.maps.LatLng(this.state.lat, this.state.lng)
                this.replaceMarkerIcon(location, map, this.state.status, this.state.type)
            }
        })
    }

    handleSex(sex) {
        this.setState({
            sex
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        let myFiles = this.state.images

        let animal = {
            name: this.state.name,
            color: this.state.color,
            breed: this.state.breed,
            type: this.state.type,
        }        
        
        let date = new Date().getTime()
        let setInitialHistory = new Promise((resolve, reject) => {
            animal.history = {};
            animal.history[date] = {
                status: this.state.status,
                sex: this.state.sex,
                lat: this.state.lat,
                lng: this.state.lng,
                region: this.state.region
            }
            animal.history[date] ? resolve() : reject()
        })

        let fileNumber = 1
        let images = []
        const uploadImageAsPromise = (animal, imageFile, key) => {            

            new Promise(function (resolve, reject) {
                
                let storageRef = firebase.storage().ref(key + "/" + imageFile.name);
        
                // Upload file
                let task = storageRef.put(imageFile);
                
                // Update progress
                task.on('state_changed', function(snapshot) {
                    let number = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    document.getElementById("Submit").innerHTML = "Upload is " + number + "% done";
                }, function(error) {
        
                }, function(complete) {
                    let downloadURL = task.snapshot.downloadURL;
                    images.push(downloadURL)
                    if(fileNumber === myFiles.length) {
                        animal.images = images
                        firebaseRef.child(animal.type + animal.history[date].status + "/" + key).set(animal)
                        firebaseRef.child("animalsWithPics/" + key).set(animal.images[0])
                        firebaseRef.child("animalsMaster/" + key).set(animal.type + animal.history[date].status)
                        this.setState({redirect: true})
                    } else {
                        ++fileNumber
                    }
                }.bind(this))
                
            }.bind(this))
        }

        setInitialHistory.then(() => {
            let key = firebaseRef.push().key;
            if(myFiles.length > 0) {
                myFiles.map((file) => {
                    uploadImageAsPromise(animal, file, key)
                })
            } else {
                firebaseRef.child(animal.type + animal.history[date].status + "/" + key).set(animal)
                firebaseRef.child("animalsMaster/" + key).set(animal.type + animal.history[date].status)
                this.setState({redirect: true})
            }
        }).catch((e) => e)
    }
    
    // Map Methods
    replaceMarkerIcon(latLng, map, status, type) {
        marker.setMap(null)
        marker = new google.maps.Marker({
            position: latLng,
            map,
            icon: require(`../images/mapIcons/${this.state.status}${this.state.type}Icon.png`)
        });
    }

    placeMarkerAndPanTo(latLng, map) {
        if(marker !== undefined) {
            marker.setMap(null)
        }
        marker = new google.maps.Marker({
            position: latLng,
            map,
            icon: require(`../images/mapIcons/${this.state.status}${this.state.type}Icon.png`)
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
        
        this.setState({
            lat: latLng.lat(),
            lng: latLng.lng(),
            region
        })
    }    

    render() {
        let Props = {
            Image: {
                onClick: this.imageUploadClick,
                showImageUploader: this.state.showImageUploader,
                onDrop: this.onDrop,
                images: this.state.images,
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
                value: this.state.name
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
                    value: this.state.status,
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
                    checked: this.state.type === "dog",
                    onChange: this.handleType
                },
                two: {
                    label: "Cat",
                    value: "cat",
                    id: "typeCat",
                    name: "type",
                    checked: this.state.type === "cat",
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
                    value: this.state.sex,
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
                value: this.state.color
            },
            Breed: {
                label: "Breed",
                name: "breed",
                ref: "breed",
                required: true,
                id: "breed",
                onChange: this.handleBreed,
                value: this.state.breed
            },
            Map: {
                typeText: this.state.type === "dog" ? "dog" : "cat",
                statusText: this.state.status === "found" ? "found" : "last seen",
                regionName: this.state.region,
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
                <img id="preview"/>
                <AddAnimalForm Props={Props}/>
                {this.state.redirect ? <Redirect to="/list" /> : null}
                <Footer/>
            </div>
        )
    }
}

const LoadConnector = connect(state => {
    return {
        user: state.user
    }
})(Add)

export default scriptLoader(["https://maps.googleapis.com/maps/api/js?key=AIzaSyDiUupl6Z9qBY5J_IKupr44xM542C23Xiw&libraries=geometry"])(LoadConnector)
