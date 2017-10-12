import { mapKeys } from 'lodash'
import {
  FETCH_MORE_RECIPES,
  FETCH_RECIPE,
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
    // recipes: { ...state.recipes, ...recipes },
    isFetching: false,
    isFetched: true,
  }
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_RECIPES: return requestRecipes(state, action)
    case RECEIVE_RECIPES: return receiveRecipes(state, action)

    case FETCH_RECIPE:
        return { ...state, activeRecipe: action.payload.data };

    case FETCH_MORE_RECIPES:
      const recipes = mapKeys(action.payload.data, 'id')

      return { ...state, recipes: { ...state.recipes, ...recipes } }

    default: return state
  }
}
