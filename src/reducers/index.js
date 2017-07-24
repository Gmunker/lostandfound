import { combineReducers } from 'redux';

import animals from './animalsReducers';
import animal from './animalReducers';

export default combineReducers({
  animals,
  animal
});