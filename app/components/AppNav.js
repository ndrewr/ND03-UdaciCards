import React from 'react'
import { Button, Text, TouchableNativeFeedback, TouchableOpacity, View, Platform } from 'react-native'
import { StackNavigator } from 'react-navigation'
// import { Constants } from 'expo'
// import { FontAwesome, Ionicons } from '@expo/vector-icons'

import { blue, lightPurp, orange, purple, white } from '../utils/colors'

import DeckScreen from '../screens/DeckScreen'
import HomeScreen from '../screens/HomeScreen'

const DeckCreatorScreen = () => <View><Text>New Deck!</Text></View>

const CreateDeckButton = ({ onPress }) => {
  const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  return (
     <Touchable
        accessibilityComponentType="button"
        onPress={onPress}>
        <View style={{ backgroundColor: 'transparent', marginRight: 20, padding: 10}}>
          <Text style={{color: white, fontSize: 20, textAlign: 'center'}}>+</Text>
        </View>
      </Touchable>
  )
}

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
        headerRight: <CreateDeckButton onPress={onPress} />,
      }
    },
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
  }
})
