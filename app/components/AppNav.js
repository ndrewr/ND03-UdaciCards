import React from 'react'
import { Button, Text, TouchableNativeFeedback, TouchableOpacity, View, Platform } from 'react-native'
import { StackNavigator } from 'react-navigation'
// import { Constants } from 'expo'
// import { FontAwesome, Ionicons } from '@expo/vector-icons'

import { blue, lightPurp, orange, purple, red, pink, white } from '../utils/colors'

import AddQuestionScreen from '../screens/AddQuestionScreen'
import DeckCreatorScreen from '../screens/DeckCreatorScreen'
import DeckScreen from '../screens/DeckScreen'
import HomeScreen from '../screens/HomeScreen'

import HeaderCreateButton from './HeaderCreateButton'

export default StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => {
      const onPress = () => {
        console.log('navigate to Deck Creator!')
        navigation.navigate(
          'CreateDeck'
        )
      }

      return {
        headerTitle: 'UDACICARDS',
        headerTintColor: white,
        headerStyle: {
          backgroundColor: orange,
        },
        headerRight: <HeaderCreateButton onPress={onPress} />,
      }
    },
  },
  DeckScreen: {
    screen: DeckScreen,
    navigationOptions: ({ navigation }) => {
      const onPress = () => {
        // console.log('navigate to question creator!', navigation.state.params)
        navigation.navigate(
          'AddQuestion',
          {
            deck_key: navigation.state.params.deck_key
          },
        )
      }

      return {
        headerTitle: 'On deck!',
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        },
        headerRight: <HeaderCreateButton onPress={onPress} />,
      }
    },
  },
  CreateDeck: {
    screen: DeckCreatorScreen,
    navigationOptions: {
      headerTitle: 'Create a new deck!',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      },
    }
  },
  AddQuestion: {
    screen: AddQuestionScreen,
    navigationOptions: {
      headerTitle: 'Adding a Question?',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: lightPurp,
      },
    }
  },
})
