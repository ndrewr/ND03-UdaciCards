// reducer

import * as actions from '../actions/action_types'

// import formatDeckTitle from '../utils/helpers'

function entries (state = {}, action) {
  switch (action.type) {
    case actions.RECEIVE_DECKS :
      return {
        decks: action.decks,
      }
    case actions.ADD_DECK :
      const { new_deck } = action
      // const deck_key = formatDeckTitle(new_deck.title)
      const deck_key = new_deck.title

      return {
        [deck_key]: new_deck,
        ...state
      }
    default :
      return state
  }
}

export default entries
