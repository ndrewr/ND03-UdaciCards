import React from 'react'
// import { Button, Text, TouchableOpacity, View, Platform } from 'react-native'
import { StackNavigator } from 'react-navigation'
// import { Constants } from 'expo'
// import { FontAwesome, Ionicons } from '@expo/vector-icons'

import { orange, purple, white } from './utils/colors'

import DeckScreen from './screens/DeckScreen'
import HomeScreen from './screens/HomeScreen'

export default function MainNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'UDACICARDS',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: orange,
      }
    }
  },
  DeckScreen: {
    screen: DeckScreen,
    navigationOptions: {
      headerTitle: 'On deck!',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
})
