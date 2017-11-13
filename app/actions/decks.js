import * as actions from './action_types'

import { getDecks } from '../utils/api'

const receiveDecks = () => {
// export function receiveDecks () {
  // const decks = await getDecks()

  // return {
  //   type: actions.RECEIVE_DECKS,
  //   decks,
  // }

  return async (dispatch) => {
    const decks = await getDecks()

    console.log('results from getDecks...', decks)

    dispatch({
      type: actions.RECEIVE_DECKS,
      decks,
    })
  }
}

function addEntry (new_deck) {
  return {
    type: actions.ADD_DECK,
    deck: new_deck,
  }
}

export default {
  receiveDecks,
  addEntry
}