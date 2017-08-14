export function testingMap(lat) {
  console.log(lat)
}

export function setGoogleMaps(googleMaps) {
  return {
    type: "SET_GOOGLE_MAPS",
    payload: googleMaps
  }
}