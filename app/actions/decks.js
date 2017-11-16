import * as actions from './action_types'

import { getDecks, saveDeckTitle } from '../utils/api'

export function receiveDecks () {
  return async (dispatch) => {
    const decks = await getDecks()

    console.dir('results from getDecks...', decks)

    dispatch({
      type: actions.RECEIVE_DECKS,
      decks,
    })
  }
}

export function createDeck (title) {
  return async (dispatch) => {
    try {
      const result = await saveDeckTitle(title)

      console.log('ACTION: creating new deck...', result)

      dispatch({
        type: actions.ADD_DECK,
        new_deck: {
          title,
          questions: []
        }
      })
    }
    catch (error) {
      // set notifiation that save failed?
      console.log('problem creating new deck...', error)
    }
  }
}
