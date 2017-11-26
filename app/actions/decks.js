import * as actions from './action_types';

import {
  addCardToDeck,
  getDecks,
  removeDeckByTitle,
  saveDeckTitle
} from '../utils/api';

export function receiveDecks() {
  return async dispatch => {
    const decks = await getDecks();

    // console.dir('results from getDecks...', decks)

    dispatch({
      type: actions.RECEIVE_DECKS,
      decks
    });
  };
}

export function createDeck(title) {
  return async dispatch => {
    try {
      const result = await saveDeckTitle(title);

      // console.log('ACTION: creating new deck...', result)

      dispatch({
        type: actions.ADD_DECK,
        new_deck: {
          title,
          questions: []
        }
      });
    } catch (error) {
      // set notifiation that save failed?
      console.log('problem creating new deck...', error);
    }
  };
}

export function addQuestion({ deck_title, answer_text, question_text }) {
  console.log(
    'lets add this question to: ',
    deck_title,
    question_text,
    answer_text
  );
  const new_card = { question: question_text, answer: answer_text };

  addCardToDeck(deck_title, new_card);

  return {
    type: actions.ADD_QUESTION,
    target_deck: {
      title: deck_title,
      card: new_card
    }
  };
}

export function removeQuestion(deck_title, question_index) {
  console.log('removing question from deck: ', deck_title, question_index);

  // removeDeckByTitle(deck_title);

  return {
    type: actions.REMOVE_QUESTION,
    target: {
      deck_title,
      question_index
    }
  };
}

export function removeDeck(deck_title) {
  console.log('removing deck: ', deck_title);

  removeDeckByTitle(deck_title);

  return {
    type: actions.REMOVE_DECK,
    deck_title
  };
}
