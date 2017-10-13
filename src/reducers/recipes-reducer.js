import { mapKeys } from 'lodash'
import {
  FETCH_MORE_RECIPES,
  REQUEST_RECIPES,
  RECEIVE_RECIPES,
} from '../actions/index';

const INITIAL_STATE = { recipes: {}, activeRecipe: {} };

function requestRecipes(state, action) {
  return {
    ...state,
    isFetching: action.payload.isFetching,
    isFetched: action.payload.isFetched,
  }
}

function receiveRecipes(state, action) {
  const recipes = mapKeys(action.payload.data, 'id')

  return {
    ...state,
    recipes,
    isFetching: false,
    isFetched: true,
  }
}

function fetchMoreRecipes(state, action) {
  const recipes = mapKeys(action.payload.data, 'id')

  return { ...state, recipes: { ...state.recipes, ...recipes } }
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_RECIPES: return requestRecipes(state, action)
    case RECEIVE_RECIPES: return receiveRecipes(state, action)
    case FETCH_MORE_RECIPES: return fetchMoreRecipes(state, action)
    default: return state
  }
}
