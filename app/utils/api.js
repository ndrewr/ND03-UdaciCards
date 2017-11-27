import { AsyncStorage } from 'react-native';

import default_data from './default_data';

import { formatDeckTitle } from './helpers';

const DECKLIST_STORAGE_KEY = 'udacicards:decklist';

// temporary clear
// AsyncStorage.multiRemove([DECKLIST_STORAGE_KEY], (err) => {
//   if (err) console.log('error clearing local storage...')
// });

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
}

// take in a single id argument and return the deck associated with that id.
export async function getDeck(deck_id) {
  try {
    const decks = await getDecks(); // verify the results?
    return decks[deck_id];
  } catch (e) {
    console.log('There was an error fetching the deck with id: ', deck_id, e);
  }
}

// take in a single title argument and remove it from the deck list
export async function removeDeckByTitle(title) {
  try {
    const decks = await getDecks(); // verify the results?

    decks[formatDeckTitle(title)] = undefined;

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
  const deck_key = formatDeckTitle(title);

  // fetch current deck? try/catch
  try {
    const decks = await getDecks();
    const target_deck = decks[deck_key];
    const updated_deck = { questions: [...target_deck.questions, card] }; // dont think I need to include "title" key here

    return AsyncStorage.mergeItem(
      DECKLIST_STORAGE_KEY,
      JSON.stringify({ [deck_key]: updated_deck })
    );
  } catch (e) {
    console.log('Error adding new question to deck: ', title, e);
  }
}

// take in a deck title and  question index it from the question list
export async function removeQuestion(title, question_index) {
  try {
    const decks = await getDecks(); // verify the results?
    // delete decks[formatDeckTitle(title)];

    // AsyncStorage.setItem(DECKLIST_STORAGE_KEY, JSON.stringify(decks));
  } catch (e) {
    console.log('There was an error removing question from deck: ', title, e);
  }
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
