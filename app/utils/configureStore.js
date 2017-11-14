import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

import deckActions from '../actions/decks'

// import { AsyncStorage } from 'react-native'

// import default_data from './default_data'

// const DECKLIST_STORAGE_KEY = 'udacicards:decklist'

// import { loadPosts } from '../actions/posts';
// import { loadCategories } from '../actions/categories';

const configureStore = () => {
  const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

  // fetch initial data
  const result = deckActions.receiveDecks()

  console.log('log: ', result)
  store.dispatch(result)

  return store;
};

export default configureStore;
