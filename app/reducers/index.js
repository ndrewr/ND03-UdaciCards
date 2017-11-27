// reducer

import * as actions from '../actions/action_types';

import { formatDeckTitle } from '../utils/helpers';

function entries(state = { decks: {} }, action) {
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
      let decks_copy = { ...state.decks };
      let target_deck = decks_copy[formatDeckTitle(action.deck_title)];

      if (target_deck) {
        delete decks_copy[formatDeckTitle(action.deck_title)];
      }

      return {
        decks: decks_copy
      };

    case actions.ADD_QUESTION:
      let { target_deck: { title, card } } = action;
      let decks = state.decks;
      let deck_key = formatDeckTitle(title);
      console.log('adding question to...', title, decks);
      let current_questions = decks[deck_key].questions;
      let updated_deck = {
        title,
        questions: [...current_questions, card]
      };

      return {
        decks: {
          ...decks,
          [deck_key]: updated_deck
        }
      };

    case actions.REMOVE_QUESTION:
      let { deck_title, question_index } = action.target;
      // let deck_key = formatDeckTitle(deck_title)
      let deck = state.decks[formatDeckTitle(deck_title)];
      // let updated_deck = {
      //   ...deck,
      //   questions: deck.questions.reduce((question_list, question, index) => {
      //     if (index !== question_index) {
      //       question_list.push(question)
      //     }
      //     return question_list
      //   }, [])
      // }

      return {
        decks: {
          ...state.decks,
          [formatDeckTitle(deck_title)]: {
            ...deck,
            questions: deck.questions.reduce(
              (question_list, question, index) => {
                if (index !== question_index) {
                  question_list.push(question);
                }
                return question_list;
              },
              []
            )
          }
        }
      };
    // return state

    default:
      return state;
  }
}

export default entries;
