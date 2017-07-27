import { combineReducers } from 'redux';

import animals from './animalsReducers';
import animal from './animalReducers';
import searchFields from './searchReducers';
import user from './userReducers';

export default combineReducers({
  animals,
  animal,
  searchFields,
  user
});