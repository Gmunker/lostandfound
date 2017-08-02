let defaultState = {
  searchText: "",
  showCat: false,
  showDog: true,
  showLost: true,
  showFound: false
}


export default function reducer(state=defaultState, action) {

  switch(action.type) {
    case "SEARCH_TEXT": {
      return {
        ...state,
        searchText: action.payload
      };
    }
    case "SHOW_DOG": {
      return {
        ...state, 
        showDog: !state.showDog
      }
    }
    case "SHOW_CAT": {
      return {
        ...state, 
        showCat: !state.showCat
      }
    }
    case "SHOW_LOST": {
      return {
        ...state, 
        showLost: !state.showLost
      }
    }
    case "SHOW_FOUND": {
      return {
        ...state, 
        showFound: !state.showFound
      }
    }
    default: {
      return state;
    }
  }

  

}

