import { combineReducers } from 'redux';

import animal from './animalReducers';
import animals from './animalsReducers';
import animalsWithPics from './randomAnimalsReducers';
import mapData from './mapReducers';
import searchFields from './searchReducers';
import user from './userReducers';

export default combineReducers({
  animal,
  animals,
  animalsWithPics,
  mapData,
  searchFields,
  user
});