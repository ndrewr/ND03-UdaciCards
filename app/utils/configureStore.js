import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import deckActions from '../actions/decks'
import rootReducer from '../reducers';

const configureStore = () => {
  const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

  // fetch initial data
  const result = deckActions.receiveDecks()

  // console.log('log: ', result) // logs out a function since receiveDecks is an async thunk
  store.dispatch(result)

  return store;
};

export default configureStore;
