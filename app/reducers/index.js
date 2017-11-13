// reducer

import * as actions from '../actions/action_types'

function entries (state = {}, action) {
  switch (action.type) {
    case actions.RECEIVE_DECKS :
      return {
        decks: action.decks,
      }
    case actions.ADD_DECK :
      return {
        ...state
      }
    default :
      return state
  }
}

export default entries
