import { combineReducers } from 'redux'
import RecipeReducer from './recipe-reducer'
import RecipesReducer from './recipes-reducer'

const rootReducer = combineReducers({
  recipes: RecipesReducer,
  activeRecipe: RecipeReducer,
})

export default rootReducer
