import { REQUEST_RECIPE, RECEIVE_RECIPE } from '../actions/'

const INITIAL_STATE = { recipe: {} }

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_RECIPE:
      const { isFetching, isFetched } = action.payload
      return { ...state, isFetching, isFetched }

    case RECEIVE_RECIPE:
      return {
        ...state,
        recipe: action.payload.data,
        isFetching: false,
        isFetched: true,
      }

    default: return state
  }
}
