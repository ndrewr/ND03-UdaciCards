import { AsyncStorage } from 'react-native';

import default_data from './default_data';

import { formatDeckTitle } from './helpers';

const DECKLIST_STORAGE_KEY = 'udacicards:decklist';

// return all of the decks along with their titles, questions, and answers.
export async function getDecks() {
  try {
    const results = await AsyncStorage.getItem(DECKLIST_STORAGE_KEY);

    const decks = results ? JSON.parse(results) : default_data;
    if (!results) {
      // stored data not present; initialize local storage for testing...
      AsyncStorage.setItem(DECKLIST_STORAGE_KEY, JSON.stringify(decks));
    }

    return decks;
  } catch (e) {
    console.log('Error fetching decks...', e);
  }

  // return AsyncStorage.getItem(DECKLIST_STORAGE_KEY)
  //   .then((results) => {
  //     const decks = results ? JSON.parse(results) : default_data

  //     if (! results) {
  //       console.log('initializing local storage...')
  //       AsyncStorage.setItem(DECKLIST_STORAGE_KEY, JSON.stringify(decks))
  //     }

  //     return decks
  //   })
}

// take in a single id argument and return the deck associated with that id.
export async function getDeck(deck_id) {
  console.log('fetching individual deck with ID...', deck_id);

  try {
    const decks = await getDecks(); // verify the results?
    return decks[deck_id];
  } catch (e) {
    console.log('There was an error fetching the deck with id: ', deck_id, e);
  }
}

export async function removeDeckByTitle(title) {
  console.log('API: removing deck...', title);

  try {
    const decks = await getDecks(); // verify the results?
    delete decks[formatDeckTitle(title)];

    AsyncStorage.setItem(DECKLIST_STORAGE_KEY, JSON.stringify(decks));
  } catch (e) {
    console.log('There was an error removing the deck: ', title, e);
  }
}

// take in a single title argument and add it to the decks
export function saveDeckTitle(title) {
  const newDeck = { title, questions: [] };
  const deck_key = formatDeckTitle(title);
  return AsyncStorage.mergeItem(
    DECKLIST_STORAGE_KEY,
    JSON.stringify({ [deck_key]: newDeck })
  );
}

// take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
export async function addCardToDeck(title, card) {
  // fetch current deck? try/catch
  const decks = await getDecks();

  const deck_key = formatDeckTitle(title);
  const target_deck = decks[deck_key];
  const updated_deck = { questions: [...target_deck.questions, card] }; // dont think I need to include "title" key here

  return AsyncStorage.mergeItem(
    DECKLIST_STORAGE_KEY,
    JSON.stringify({ [deck_key]: updated_deck })
  );
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
