import { combineReducers } from 'redux';

import animals from './animalsReducers';
import newAnimal from './newAnimalReducers';

export default combineReducers({
  animals,
  newAnimal
});