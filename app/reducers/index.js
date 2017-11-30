// root reducer

import * as actions from '../actions/action_types';

import {
  formatDeckTitle,
  addQuestionToState,
  removeDeckFromState,
  removeQuestionFromState
} from '../utils/helpers';

function reducer(state = { decks: {} }, action) {
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
      const { deck_title, question_index } = action.target;

      return {
        decks: removeQuestionFromState(state.decks, deck_title, question_index)
      };

    default:
      return state;
  }
}

export default reducer;
