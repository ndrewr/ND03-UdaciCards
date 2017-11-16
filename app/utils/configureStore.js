import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { receiveDecks } from '../actions/decks'

import rootReducer from '../reducers';

const configureStore = () => {
  const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

  // fetch initial data
  store.dispatch(receiveDecks())

  return store;
};

export default configureStore;
