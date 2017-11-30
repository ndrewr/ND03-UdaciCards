import React from 'react';
import { View, Platform } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducers';

import { orange, purple, white } from './utils/colors';
import { clearLocalNotification, setLocalNotification } from './utils/helpers';
import configureStore from './utils/configureStore';

import DeckScreen from './screens/DeckScreen';
import HomeScreen from './screens/HomeScreen';

import AppNav from './components/AppNav';
import StatusBar from './components/StatusBar';

export default class AppRoot extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={configureStore()}>
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor={purple} barStyle="light-content" />
          <AppNav />
        </View>
      </Provider>
    );
  }
}
