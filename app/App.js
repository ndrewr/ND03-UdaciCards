import React from 'react'
import { View, Platform } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
// import { FontAwesome, Ionicons } from '@expo/vector-icons'

import reducer from './reducers'
import { orange, purple, white } from './utils/colors'

import DeckScreen from './screens/DeckScreen'
import HomeScreen from './screens/HomeScreen'

import AppNav from './components/AppNav'
import UdaciStatusBar from './components/UdaciStatusBar'

import configureStore from './utils/configureStore'

export default class AppRoot extends React.Component {
  // componentDidMount() {
  //   setLocalNotification()
  // }

      // <Provider store={createStore(reducer)}>
  render() {
    return (
      <Provider store={configureStore()}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <AppNav />
        </View>
      </Provider>
    )
  }
}

// const Tabs = TabNavigator({
//   History: {
//     screen: History,
//     navigationOptions: {
//       tabBarLabel: 'History',
//       tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
//     },
//   },
//   Live: {
//     screen: Live,
//     navigationOptions: {
//       tabBarLabel: 'Live',
//       tabBarIcon: ({ tintColor }) => <Ionicons name='ios-speedometer' size={30} color={tintColor} />
//     }
//   }
// }, {
//   navigationOptions: {
//     header: null
//   },
//   tabBarOptions: {
//     activeTintColor: Platform.OS === 'ios' ? purple : white,
//     style: {
//       height: 56,
//       backgroundColor: Platform.OS === 'ios' ? white : purple,
//       shadowColor: 'rgba(0, 0, 0, 0.24)',
//       shadowOffset: {
//         width: 0,
//         height: 3
//       },
//       shadowRadius: 6,
//       shadowOpacity: 1
//     }
//   }
// })
