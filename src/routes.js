import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './App'
import Recipes from './components/recipes'
import RecipeDetail from './components/recipe-detail'


export default (
  <Route path='/' component={App}>
  {/* Change index route when landing page is built */}
    <IndexRoute component={Recipes} />
    <Route path='recipes' component={Recipes} />
    <Route path='recipes/:id' component={RecipeDetail} />
  </Route>
)
