// TODO add error handling/tests

import axios from 'axios'

const ROOT_URL = process.env.REACT_APP_ROOT_URL ||
  'http://localhost:5000/api'

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

export function fetchMoreRecipes(search = '', offset = 0) {
  const request = axios.get(`${ROOT_URL}/recipes?search=${search}&offset=${offset}`)

  return {
    type: FETCH_MORE_RECIPES,
    payload: request,
  }
}

export function fetchRecipe(id) {
  const request = axios.get(`${ROOT_URL}/recipes/${id}`)

  return {
    type: FETCH_RECIPE,
    payload: request,
  }
}
