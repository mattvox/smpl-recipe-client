import { combineReducers } from 'redux';

import RecipesReducer from './recipes-reducer';
// import SearchReducer from './reducer-search';
// import OffsetReducer from './reducer-offset';

const rootReducer = combineReducers({
  recipes: RecipesReducer,
  // search: SearchReducer,
  // offset: OffsetReducer,
});

export default rootReducer;
