import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navigation from '../Navigation';
import scriptLoader from 'react-async-script-loader';
import { fetchAnimal } from '../actions/animalsActions';
import { currentAnimal } from '../actions/animalActions';
import { updateAnimal, deleteAnimal } from '../actions/firebaseActions';
import { connect } from 'react-redux';
import regions from '../GoogleMap/geojson.json';
import UpdateContent from './Update';
import firebase from 'firebase';
import Footer from '../Footer';

let firebaseRef = firebase.database().ref("HipD");
let google
let map
let marker
let newMarker
let submitted

class Update extends Component {
	constructor(props) {
		super(props)
		this.state = {
			newHistory: null,
			redirect: false,
			animalFound: null,
			images: [],
			deleteFromFBStorage: []
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleStatus = this.handleStatus.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSex = this.handleSex.bind(this);
		this.placeMarkerAndPanTo = this.placeMarkerAndPanTo.bind(this);
		this.findRegion = this.findRegion.bind(this);
		this.replaceMarkerIcon = this.replaceMarkerIcon.bind(this);
        this.handleDelete = this.handleDelete.bind(this)
        this.handleName = this.handleName.bind(this)
        this.handleColor = this.handleColor.bind(this)
		this.handleBreed = this.handleBreed.bind(this)
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
        } else {
			let animalID = this.props.match.params.id
			this.props.dispatch(fetchAnimal(animalID))
			submitted = false
		}
	}

	componentWillReceiveProps(nextProps, nextState) {
		// if (this.props.currentAnimal.animalNotFound) {
		// 	return true
		// }
		
		if ((this.props.currentAnimal.id !== nextProps.currentAnimal.id)) {
			this.setState((state, props) => { return { currentAnimal: nextProps.currentAnimal }});
		}
		if (nextProps.currentAnimal !== this.props.currentAnimal) {
			if (this.state.images.length === 0) {
				if (nextProps.currentAnimal.images === undefined) {
					this.setState({
						images: []
					})
				} else {
					this.setState({
						images: nextProps.currentAnimal.images
					})
				}
			}
			if(this.state.newHistory === null) { 
				this.setState((state, props) => { return { newHistory: nextProps.currentAnimal.history[0] }});
				// return true
			}
		}
		// return false
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(this.state.redirect === false) {
			if ((nextProps.isScriptLoaded && nextProps.isScriptLoadSucceed) || 
				(this.props.isScriptLoaded && this.props.isScriptLoadSucceed)) {
				if ((nextProps.currentAnimal.history || this.props.currentAnimal.history) || nextProps.currentAnimal.animalNotFound) {
						return true
				} else {
						return false
				}
			}
		} else {
			return false
		}
	}

	componentDidUpdate (nextProps, nextState) {
		if(submitted === false) {
			let currentAnimal = this.props.currentAnimal
			let positionHistory = []
			currentAnimal.history.map((event, i) => {
				if(event.lat && event.lng) {
					positionHistory.push(event)
				}
			})
			if (google === undefined) {
				
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

				positionHistory.map((event, index) => {
					let customMarker = {
						url: require(`../images/mapIcons/${positionHistory[index].status}${currentAnimal.type}Icon.png`),
						size: new google.maps.Size(53, 40),
						origin: new google.maps.Point(0, 0),
						anchor: new google.maps.Point(21, 41),
						labelOrigin: new google.maps.Point(40, 16)
					}
					marker = new google.maps.Marker({
						position: {
							lat: event.lat,
							lng: event.lng
						},
						map,
						icon: customMarker
					})
				})
				map.addListener('click', function(e) {
					this.setState({
						newHistory: {
							...this.state.newHistory,
							lat: e.latLng.lat(),
							lng: e.latLng.lng(),
							region: this.findRegion(e.latLng, google)
						}
					})
					this.placeMarkerAndPanTo(e.latLng, map, google)
				}.bind(this))
			}
		}
	}

	componentWillUnmount() {
		this.props.dispatch(currentAnimal({type: "dog"}))
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
                            console.log("landscape")
                            if (width > maxWidth) {
                                height = Math.round(height * maxWidth / width)
                                width = maxWidth
                            }
                        } else {
                            console.log("portrait")
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

		// let oldFiles = []
		// if(this.state.images !== undefined) {
		// 	oldFiles = this.state.images
		// }

        // newFiles.map((file) => {
		// 	oldFiles.push(file)
		// })

        // this.setState({
		// 	images: oldFiles,
        //     showImageUploader: false
        // })
    }

    cancel() {
        this.setState({
            showImageUploader: false
        })
    }

    removeImage(index) {
		let images = this.state.images
		if (typeof(images[index]) === 'string') {
			// let filename = images[index]
			// .replace(/^.*[\\\/]/, '')
			let deleteFiles = this.state.deleteFromFBStorage
			deleteFiles.push(images[index])
			images.splice(index, 1);
			this.setState({
				deleteFromFBStorage: deleteFiles,
				images
			})
		}
		images.splice(index, 1);
        this.setState({
            images
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
	handleChange(event) {
		event.preventDefault();
		let ref = this.refs;
		this.props.dispatch(currentAnimal({
			...this.props.currentAnimal,
			name: ref.name.value,
			color: ref.color.value,
			breed: ref.breed.value
		}))
    }
    
    handleName(e) {
        this.props.dispatch(currentAnimal({
			...this.props.currentAnimal,
			name: e.target.value
		}))
    }

    handleColor(e) {
        this.props.dispatch(currentAnimal({
			...this.props.currentAnimal,
			color: e.target.value
		}))
    }

    handleBreed(e) {
        this.props.dispatch(currentAnimal({
			...this.props.currentAnimal,
			breed: e.target.value
		}))
    }

	handleStatus(status) {
		this.setState({
			newHistory: {
				...this.state.newHistory,
				status
			}
		}, () => {
			if(newMarker !== undefined) {
				this.replaceMarkerIcon()
			}
		})
	}

	handleSex(sex) {
		this.setState({
			newHistory: {
				...this.state.newHistory,
				sex
			}
		})
	}

	handleSubmit(e) {
		e.preventDefault();
		submitted = true
		let key = this.props.currentAnimal.id
		let imagesToDelete = this.state.deleteFromFBStorage
		// Delete images from Storage as needed
		if (imagesToDelete !== []) {
			imagesToDelete.map((url) => {
				let storageRef = firebase.storage().refFromURL(url)
				storageRef.delete().then(function() {
				// File deleted successfully
				}).catch(function(error) {
				// Should exit and display error
				console.log("Unable to delete image")
				});
			})
		}

		// If all images have been removed from the gallery delete the record from animalsWithPics
		if(this.state.images.length === 0) {
			firebaseRef.child('animalsWithPics/' + key).remove()
		}
		
		// Get a list of just the image objects that need to be uploaded
		// Put the image urls in a new array to have the new download urls added to later
		let allImages = this.state.images
		let imageObjects = []
		let imageUrls = []
		allImages.map((image) => {
			if (typeof(image) !== 'string') {
				imageObjects.push(image)
			} else {
				imageUrls.push(image)
			}
		})

		// Upload imageObjects function
		let images = []
		let fileNumber = 1
		const uploadImageAsPromise = (animal, object) => {

			return new Promise(function (resolve, reject) {
						
				let storageRef = firebase.storage().ref(key + "/" + object.name);
		
				// Upload file
				let task = storageRef.put(object);
				
				// Update progress
				task.on('state_changed', function(snapshot) {
					let number = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
					document.getElementById("Submit").innerHTML = "Upload is " + number + "% done";
				}, function(error) {

					// Handle upload error
					console.log("Error uploading image file")
				}, function(complete) {

					// Grab the url for the image in storage and add it to imageUrls to go in db
					let downloadURL = task.snapshot.downloadURL;
					imageUrls.push(downloadURL)	
					if(fileNumber === imageObjects.length) {
						// Last pass. Send back the image urls array
						animal.images = imageUrls
						// firebaseRef.child("animals/" + key).set(animal)
						resolve(animal);			
						// this.setState({redirect: true})

					} else {
						++fileNumber
					}
				}.bind(this))
			}.bind(this))
		}
		
		let date = new Date()
		let newHistory = this.state.newHistory
		newHistory = {
			...newHistory,
			date
		}
		if (this.state.newHistory === this.props.currentAnimal.history[0]) {
			// History has not changed. Push the currentAnimal
			let history = {};
			this.props.currentAnimal.history.map((event, i) => {
				let historyKey = event.date.getTime()
				delete event.date
				history[historyKey] = event
			})			

			let newCurrent = this.props.currentAnimal
			newCurrent = {
				...newCurrent,
				history: {
					...history
				}
			}

			if (imageObjects.length > 0) {
				// map over each image as in the Add page sumbit
				imageObjects.map((file) => {
					uploadImageAsPromise(newCurrent, file)
					.then(function(animal) {
						// Update the animal in db
						firebaseRef.child(this.props.currentAnimal.type + this.props.currentAnimal.history[0].status + "/" + key).update(animal)
						// Update animalsWithPics
						firebaseRef.child("animalsWithPics/" + key).set(animal.images[0])
						this.setState({redirect: true})
					}.bind(this))
				})
			} else {
				firebaseRef.child(this.props.currentAnimal.type + this.props.currentAnimal.history[0].status + "/" + key).update(newCurrent)
				this.setState({redirect: true})
			}
		
		} else {
			// History has changed
			// Has location changed
			if(newHistory.lat === this.props.currentAnimal.history[0].lat && newHistory.lng === this.props.currentAnimal.history[0].lng) {
				newHistory.lat = null
				newHistory.lng = null
				newHistory.region = null
			}			
			
			this.props.currentAnimal.history.push(newHistory)
			// Do something amazing in a loop that grabs the new date and keys each item in history with that transformed date
			let history = {};
			this.props.currentAnimal.history.map((event, i) => {
				let key = event.date.getTime()
				delete event.date
				history[key] = event
			})
			let newCurrent = this.props.currentAnimal
			newCurrent = {
				...newCurrent,
				history: {
					...history
				}
			}

			if (imageObjects.length > 0) {
				// map over each image as in the Add page sumbit
				imageObjects.map((file, index) => {
					uploadImageAsPromise(newCurrent, file)
					.then(function(animal) {
						firebaseRef.child("animalsMaster/" + key).set(animal.type + animal.history[date.getTime()].status).then(() => {
							firebaseRef.child(this.props.currentAnimal.type + this.props.currentAnimal.history[0].status + "/" + key).remove().then(() => {
								firebaseRef.child("animalsWithPics/" + key).set(animal.images[0]).then(() => {
									firebaseRef.child(animal.type + animal.history[date.getTime()].status + "/" + key).set(animal).then(() => {
										this.setState({redirect: true})
									})
								})
							})
						})
						// this.setState({redirect: true})
						// Change history and upload image
						// remove the old object
						
						// write the new object
						
						
						// update the animalsMaster
						
						// update the animalsWithPics
						
						// this.setState({redirect: true})
					}.bind(this))
				})
				
			} else {
				// History has changed!
				// remove the old object
				firebaseRef.child(this.props.currentAnimal.type + this.props.currentAnimal.history[0].status + "/" + key).remove()
				// write the new object
				firebaseRef.child(newCurrent.type + newCurrent.history[date.getTime()].status + "/" + key).set(newCurrent)
				// update the animalsMaster
				firebaseRef.child("animalsMaster/" + key).set(newCurrent.type + newCurrent.history[date.getTime()].status)
				this.setState({redirect: true})
			}
		}
    }
    
    handleDelete(e) {
		e.preventDefault()
		let images = this.state.images
		images.map((image) => {
			if (typeof(image) === 'string') {
				let storageRef = firebase.storage().refFromURL(image)
				storageRef.delete().then(function() {
					// File deleted successfully
				}).catch(function(error) {
					// Should exit and display error
					console.log("Unable to delete image")
				});
			}
		})
		let currentStatus = this.props.currentAnimal.history[0].status
		let currentType = this.props.currentAnimal.type
		let currentNode = currentType + currentStatus
		let id = this.props.currentAnimal.id
		let dataToDelete = {}
		dataToDelete[currentNode + "/" + id] = null
		dataToDelete["animalsMaster" + "/" + id] = null
		dataToDelete["animalsWithPics/" + id] = null
		this.setState({
			redirect: true
		}, () => {
			firebaseRef.update(dataToDelete)
		})
	}

	// Map Methods
	replaceMarkerIcon() {
        newMarker.setMap(null)
        newMarker = new google.maps.Marker({
            position: {
				lat: this.state.newHistory.lat,
				lng: this.state.newHistory.lng
			},
            map,
            icon: require(`../images/mapIcons/${this.state.newHistory.status}${this.props.currentAnimal.type}Icon.png`)
		});
		map.panTo(newMarker.position);
    }

	placeMarkerAndPanTo(latLng, map, google) {
		if(newMarker !== undefined) {
			newMarker.setMap(null)
		}
		newMarker = new google.maps.Marker({
			position: latLng,
			map,
			icon: require(`../images/mapIcons/${this.state.newHistory.status}${this.props.currentAnimal.type}Icon.png`)
		});
		map.panTo(latLng);
	}

	findRegion(latLng, google) {
		let regionName;
		regions.map((region, i) => {
            let currentPoly = new google.maps.Polygon({paths: region.polygon})
            if(google.maps.geometry.poly.containsLocation(latLng, currentPoly)) {
                regionName = region.name
            }
        })
		
		let region = regionName !== undefined ? regionName : "Outside Defined Regions"
		return region
	}	
		
	render() {
		let animal = this.props.currentAnimal
		if (!this.props.user.uid) {
			return(
				<Redirect to="/list" />
			)
		}
		if (this.props.currentAnimal.animalNotFound === true ) {
			return (
					<Redirect to="/list" />
			)
		} else if (!animal.history) {
			return(
				<div>Loading...</div>
			)
		} else if (animal.history) {

            let newHistory = this.state.newHistory

            let Props = {
                animal: this.props.currentAnimal,
				newHistory: newHistory,
				Image: {
					onClick: this.imageUploadClick,
					showImageUploader: this.state.showImageUploader,
					onDrop: this.onDrop,
					images: this.state.images,
					cancel: this.cancel,
					removeImage: this.removeImage,
					makeFeatured: this.makeFeatured
				},
                Map: { 
                    ref: el => this.map = el,
                },
                Submit: {
                    handleSubmit: this.handleSubmit
                },
                Delete: {
                    handleDelete: this.handleDelete
                },
                Status: {
                    options: [
                        "lost",
                        "found"
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
                    value: animal.color
                },
                Breed: {
                    label: "Breed",
                    name: "breed",
                    ref: "breed",
                    required: true,
                    id: "breed",
                    onChange: this.handleBreed,
                    value: animal.breed
                },
                Name: {
                    label: "Name",
                    name: "name",
                    ref: "name",
                    required: true,
                    id: "name",
                    onChange: this.handleName,
                    value: animal.name
                }
            }

			return(
				this.state.redirect ?
				<Redirect to="/list" />:
				<div className="addContent content">
					<Navigation />
					<UpdateContent Props={Props}/>
					<Footer/>
				</div>
			)
		}
	}
}

const LoadConnector = connect(state => {
    return {
		currentAnimal: state.animal.currentAnimal,
		user: state.user
    }
})(Update);
export default scriptLoader(["https://maps.googleapis.com/maps/api/js?key=AIzaSyDiUupl6Z9qBY5J_IKupr44xM542C23Xiw&libraries=geometry"])(LoadConnector) 