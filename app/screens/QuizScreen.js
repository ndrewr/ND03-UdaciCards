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

import TextButton from '../components/TextButton';

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
        <TextButton
          text="HELP!"
          onPress={() => console.log('help button toggled')}
        />
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
    marginRight: 10
  },
  list_container: {
    paddingBottom: 30
  }
});

const mapStateToProps = (state, props) => {
  const { deck_key } = props.navigation.state.params;

  return {
    deck_key,
    deck: state.decks[deck_key]
  };
};

export default connect(mapStateToProps)(QuizScreen);
