export function testingMap(lat) {
  console.log(lat)
}

export function setGoogleMap(googleMap) {
  return {
    type: "SET_GOOGLE_MAPS",
    payload: googleMap
  }
}