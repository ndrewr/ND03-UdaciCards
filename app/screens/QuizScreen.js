import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
  blue,
  lightPurp,
  orange,
  purple,
  red,
  pink,
  white
} from '../utils/colors';

// ☐ displays a card question
//  ☐ an option to view the answer (flips the card)
//  ☐ a "Correct" button
//  ☐ an "Incorrect" button
//  ☐ the number of cards left in the quiz
//  ☐ Displays the percentage correct once the quiz is complete
class QuizScreen extends Component {
  render() {
    const { deck, deck_key } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.header_text}>Now practicing... {deck.title}</Text>
        <Text style={styles.header_sub}>
          {`${deck.questions.length} questions`}
        </Text>
        <View style={styles.card} />
        <TouchableOpacity onPress={() => console.log('help button toggled')}>
          <View style={styles.button}>
            <Text style={styles.text}>HELP!</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  card: {
    elevation: 4,
    backgroundColor: '#2196F3',
    borderRadius: 2,
    flex: 1,
    height: 200,
    margin: 30
  },
  header_text: {
    fontSize: 20,
    fontWeight: '600'
  },
  header_sub: {
    fontSize: 16,
    marginBottom: 10
  },
  question_text: {
    fontSize: 18
  },
  answer_text: {
    fontSize: 16,
    fontStyle: 'italic',
    marginLeft: 20
  },
  accordion_row: {
    flex: 1,
    flexDirection: 'row'
  },
  icon_button: {
    // padding: 5,
    marginRight: 10
  },
  list_container: {
    paddingBottom: 30
  },
  button: Platform.select({
    ios: {},
    android: {
      elevation: 4,
      // Material design blue from https://material.google.com/style/color.html#color-color-palette
      backgroundColor: '#2196F3',
      borderRadius: 2
    }
  }),
  text: Platform.select({
    ios: {
      // iOS blue from https://developer.apple.com/ios/human-interface-guidelines/visual-design/color/
      color: '#007AFF',
      textAlign: 'center',
      padding: 8,
      fontSize: 18
    },
    android: {
      color: 'white',
      textAlign: 'center',
      padding: 8,
      fontWeight: '500'
    }
  })
});

const mapStateToProps = (state, props) => {
  const { deck_key } = props.navigation.state.params;

  return {
    deck_key,
    deck: state.decks[deck_key]
  };
};

export default connect(mapStateToProps, null)(QuizScreen);
