import ADD_DECK, RECEIVE_DECKS from './action_types'

import { getDecks } from '../utils/api'

export function receiveDecks (decks) {
  const decks = await getDecks()

  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addEntry (new_deck) {
  return {
    type: ADD_DECK,
    deck: new_deck,
  }
}
