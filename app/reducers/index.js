// reducer

import * as actions from '../actions/action_types'

import { formatDeckTitle } from '../utils/helpers'

function entries (state = { decks: {} }, action) {
  console.log('REDUCER: ', action.type, action)
  switch (action.type) {
    case actions.RECEIVE_DECKS :
      return {
        decks: action.decks,
      }
    case actions.ADD_DECK :
      const { new_deck } = action
      const deck_key = formatDeckTitle(new_deck.title)

      return {
        decks: {
          [deck_key]: new_deck,
          ...state.decks
        }
      }
    default :
      return state
  }
}

export default entries
