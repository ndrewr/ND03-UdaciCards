// reducer

import * as actions from '../actions/action_types';

import { formatDeckTitle } from '../utils/helpers';

function removeDeckFromState(decks, deck_title) {
  const decks_copy = { ...decks };
  const deck_key = formatDeckTitle(deck_title);

  decks_copy[deck_key] = undefined;
  delete decks_copy[deck_key];

  return decks_copy;
}

function addQuestionToState(decks, deck_title, new_card) {
  const deck_key = formatDeckTitle(deck_title);
  const updated_deck = {
    title: deck_title,
    questions: [...decks[deck_key].questions, new_card]
  };

  return {
    ...decks,
    [deck_key]: updated_deck
  };
}

function removeQuestionFromState(decks, deck_title, question_index) {
  const deck_key = formatDeckTitle(deck_title);
  const target_deck = decks[deck_key];
  const updated_deck = {
    title: deck_title,
    questions: target_deck.questions.reduce(
      (question_list, question, index) => {
        if (index !== question_index) {
          question_list.push(question);
        }
        return question_list;
      },
      []
    )
  };

  console.log('modified deck after removing question: ', updated_deck);

  return {
    ...decks
    // [deck_key]: updated_deck,
  };
}

function reducer(state = { decks: {} }, action) {
  console.log('REDUCER: ', action.type, action);

  switch (action.type) {
    case actions.RECEIVE_DECKS:
      return {
        decks: action.decks
      };

    case actions.ADD_DECK:
      const { new_deck } = action;

      return {
        decks: {
          [formatDeckTitle(new_deck.title)]: new_deck,
          ...state.decks
        }
      };

    case actions.REMOVE_DECK:
      return {
        decks: removeDeckFromState(state.decks, action.deck_title)
      };

    case actions.ADD_QUESTION:
      const { target_deck: { title, card } } = action;

      return {
        decks: addQuestionToState(state.decks, title, card)
      };

    case actions.REMOVE_QUESTION:
      let { deck_title, question_index } = action.target;

      return {
        decks: removeQuestionFromState(state.decks, deck_title, question_index)
      };

    default:
      return state;
  }
}

export default reducer;
