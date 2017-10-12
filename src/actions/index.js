/*
TODO

- use thunks to better dispatch actions when fetches are made, requested, processed, and received
- add error handling!!!
- clean up commented out, old code
- make sure all paths are relative
- look into adding or removing callbacks as second arguments?
- do I really need to track search terms globally because url query/params
*/

import axios from 'axios'

const ROOT_URL = 'http://localhost:5000/api'

export const FETCH_RECIPES = 'FETCH_RECIPES'
export const FETCH_MORE_RECIPES = 'FETCH_MORE_RECIPES'
export const FETCH_RECIPE = 'FETCH_RECIPE'

export const REQUEST_RECIPES = 'REQUEST_RECIPES'
export const RECEIVE_RECIPES = 'RECEIVE_RECIPES'

export const REQUEST_RECIPE = 'REQUEST_RECIPE'
export const RECEIVE_RECIPE = 'RECEIVE_RECIPE'

export function requestRecipes(isFetched) {
  return {
    type: REQUEST_RECIPES,
    payload: { isFetching: true, isFetched }
  }
}

export function receiveRecipes(response) {
  return {
    type: RECEIVE_RECIPES,
    payload: response
  }
}

export function fetchRecipes(
  search = '',
  offset = 0,
  isFetched = false,
  callback = null
) {
  const request = axios.get(`${ROOT_URL}/recipes?search=${search}&offset=${offset}`)
    .then(response => {
      callback && callback()
      return response
    })
    .catch(console.error)

    return dispatch => {
      dispatch(requestRecipes(isFetched))

      return request
        .then(response => dispatch(receiveRecipes(response)))
    }
}

// clean up the way offset is implemented in this action

export function fetchMoreRecipes(search = '', offset = 0) {
  const request = axios.get(`${ROOT_URL}/recipes?search=${search}&offset=${offset}`)

  return {
    type: FETCH_MORE_RECIPES,
    payload: request,
  }
}

export function fetchRecipe(id) {
  const request = axios.get(`${ROOT_URL}/recipes/${id}`)
  // then()
  return {
    type: FETCH_RECIPE,
    payload: request,
  }
}
