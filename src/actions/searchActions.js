export function searchText(text) {
  return {
    type: "SEARCH_TEXT",
    payload: text
  }
}

export function showType() {
  console.log("Type ran")
  return function(dispatch) {
    dispatch({type: "SHOW_DOG"});
    dispatch({type: "SHOW_CAT"});
  }
}

export function showStatus() {
  console.log("Status ran")
  return function(dispatch) {
    dispatch({type: "SHOW_LOST"});
    dispatch({type: "SHOW_FOUND"})
  }
}

export function showFound() {
  return {
    type: "SHOW_FOUND"
  }
}