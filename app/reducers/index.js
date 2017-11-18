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

      return {
        decks: {
          [formatDeckTitle(new_deck.title)]: new_deck,
          ...state.decks
        }
      }

    case actions.ADD_QUESTION :
      const { target_deck: { title, card } } = action
      const deck_key = formatDeckTitle(title)
      const decks = state.decks
      const current_questions = decks[deck_key].questions
      const updated_deck = {
        title,
        questions: [...current_questions, card]
      }

      return {
        decks: {
          ...decks,
          [deck_key]: updated_deck
        }
      }

    default :
      return state
  }
}

export default entries
