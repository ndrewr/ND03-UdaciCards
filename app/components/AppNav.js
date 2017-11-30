import React from 'react';
import { StackNavigator } from 'react-navigation';

import { blue, lightPurp, orange, purple, red, white } from '../utils/colors';

import AddQuestionScreen from '../screens/AddQuestionScreen';
import DeckCreatorScreen from '../screens/DeckCreatorScreen';
import DeckScreen from '../screens/DeckScreen';
import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';

import HeaderCreateButton from './HeaderCreateButton';

export default StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => {
      const onPress = () => {
        navigation.navigate('CreateDeck');
      };

      return {
        headerTitle: 'UDACICARDS',
        headerTintColor: white,
        headerStyle: {
          backgroundColor: orange
        },
        headerRight: <HeaderCreateButton onPress={onPress} />
      };
    }
  },
  DeckScreen: {
    screen: DeckScreen,
    navigationOptions: ({ navigation }) => {
      const onPress = () => {
        navigation.navigate('AddQuestion', {
          deck_key: navigation.state.params.deck_key
        });
      };

      return {
        headerTitle: 'On deck!',
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple
        },
        headerRight: <HeaderCreateButton onPress={onPress} />
      };
    }
  },
  QuizScreen: {
    screen: QuizScreen,
    navigationOptions: {
      headerTitle: 'Quiz Time!',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: red
      }
    }
  },
  CreateDeck: {
    screen: DeckCreatorScreen,
    navigationOptions: {
      headerTitle: 'Create a new deck!',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue
      }
    }
  },
  AddQuestion: {
    screen: AddQuestionScreen,
    navigationOptions: {
      headerTitle: 'Adding a Question?',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: lightPurp
      }
    }
  }
});
