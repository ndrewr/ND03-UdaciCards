import { RECEIVE_DECKS, ADD_DECK } from '../actions/actions_types'

function entries (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        decks: action.decks,
      }
    case ADD_DECK :
      return {
        ...state
      }
    default :
      return state
  }
}

export default entries
