// TODO add error handling/tests

import axios from 'axios'

// server URL
const ROOT_URL = process.env.REACT_APP_ROOT_URL ||
  'http://localhost:5000/api'

// action types for handling multiple recipes data
export const FETCH_RECIPES = 'FETCH_RECIPES'
export const FETCH_MORE_RECIPES = 'FETCH_MORE_RECIPES'
export const REQUEST_RECIPES = 'REQUEST_RECIPES'
export const RECEIVE_RECIPES = 'RECEIVE_RECIPES'

// action types for handling single recipe data
export const SET_RECIPE = 'SET_RECIPE'
export const FETCH_RECIPE = 'FETCH_RECIPE'
export const REQUEST_RECIPE = 'REQUEST_RECIPE'
export const RECEIVE_RECIPE = 'RECEIVE_RECIPE'

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

export function fetchMoreRecipes(search = '', offset = 0) {
  const request = axios.get(`${ROOT_URL}/recipes?search=${search}&offset=${offset}`)

  return {
    type: FETCH_MORE_RECIPES,
    payload: request,
  }
}

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

export function fetchRecipe(id, isFetched = false, callback = null) {
  const request = axios.get(`${ROOT_URL}/recipes/${id}`)
    .then(response => {
      callback && callback()
      return response
    })
    .catch(console.error)

    return dispatch => {
      dispatch(requestRecipe(isFetched))

      return request
        .then(response => dispatch(receiveRecipe(response)))
    }
}

export function requestRecipe(isFetched) {
  return {
    type: REQUEST_RECIPE,
    payload: { isFetching: true, isFetched }
  }
}

export function receiveRecipe(response) {
  return {
    type: RECEIVE_RECIPE,
    payload: response.data
  }
}

export function setRecipe(recipe) {
  return dispatch => dispatch(receiveRecipe(recipe))
}
