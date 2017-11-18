import { AsyncStorage } from 'react-native'

import default_data from './default_data'

import { formatDeckTitle } from './helpers'

const DECKLIST_STORAGE_KEY = 'udacicards:decklist'

// return all of the decks along with their titles, questions, and answers.
export function getDecks () {
  console.log('fetching decks!!!');
  return AsyncStorage.getItem(DECKLIST_STORAGE_KEY)
    .then((results) => {
      const decks = results ? JSON.parse(results) : default_data

      // console.log('deck results...', results, decks)

      if (! results) {
        console.log('initializing local storage...')
        AsyncStorage.setItem(DECKLIST_STORAGE_KEY, JSON.stringify(decks))
      }

      return decks
      // return results ? JSON.parse(results) : default_data
    })
    .then(result => {
      // AsyncStorage.setItem(DECKLIST_STORAGE_KEY, JSON.stringify(result))
      return result
    })
}

 // take in a single id argument and return the deck associated with that id.
export function getDeck (deck_id) {
  console.log('fetching individual deck with ID...', deck_id);
}

// take in a single title argument and add it to the decks
export function saveDeckTitle (title) {
  // create new deck object
  // grab state from storage
  // add the new item to storage; use mergeItem
  // when the operation has succeeded, return the new object

  const newDeck = { title, questions: [] }

  const deck_key = formatDeckTitle(title)
  // const deck_key = title
  console.log('creating new deck with title...', title, deck_key);

  return AsyncStorage.mergeItem(DECKLIST_STORAGE_KEY, JSON.stringify({ [deck_key]: newDeck }))
}

// take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
export async function addCardToDeck (title, card) {
  console.log('creating new card in deck with title...', title, card);

  // fetch current deck? try/catch
  const decks = await getDecks()

  const deck_key = formatDeckTitle(title)
  const target_deck = decks[deck_key]
  const updated_deck = { questions: [...target_deck.questions, card] } // dont think I need to include "title" key here

  return AsyncStorage.mergeItem(DECKLIST_STORAGE_KEY, JSON.stringify({ [deck_key]: updated_deck }))
}

// export function fetchCalendarResults () {
//   return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
//     .then(formatCalendarResults)
// }

// export function submitEntry ({ entry, key }) {
//   return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
//     [key]: entry
//   }))
// }

// export function removeEntry (key) {
//   return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
//     .then((results) => {
//       const data = JSON.parse(results)
//       data[key] = undefined
//       delete data[key]
//       AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
//     })
// }
