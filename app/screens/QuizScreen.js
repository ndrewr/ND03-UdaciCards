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

import Card from '../components/Card';

import IconButton from '../components/IconButton';
import TextButton from '../components/TextButton';

class QuestionCard extends Component {
  state = {
    faceUp: false
  };

  flipCard = () => {
    this.setState(state => ({ faceUp: !state.faceUp }));
  };

  render() {
    const { question } = this.props;
    const { faceUp } = this.state;

    return (
      <TouchableOpacity onPress={this.flipCard} style={styles.card}>
        <View>
          {faceUp ? (
            <View style={styles.card_front}>
              <Text>FRONT SIDE</Text>
              <Text>{question.answer}</Text>
            </View>
          ) : (
            <View style={styles.card_back}>
              <Text>BACK SIDE</Text>
              <Text>{question.question}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

// ☐ displays a card question
//  ☐ an option to view the answer (flips the card)
//  ☐ a "Correct" button
//  ☐ an "Incorrect" button
//  ☐ the number of cards left in the quiz
//  ☐ Displays the percentage correct once the quiz is complete
class QuizScreen extends Component {
  state = {
    questionNumber: 1,
    correctCount: 0,
    incorrectCount: 0
  };

  onCorrect = () => {
    const { deck, deck_key } = this.props;
    const { questionNumber } = this.state;

    console.log('CORRECT!');
    if (deck.questions.length > questionNumber) {
      this.setState(state => ({
        correctCount: state.correctCount + 1,
        questionNumber: state.questionNumber + 1
      }));
    } else {
      this.setState(state => ({ correctCount: state.correctCount + 1 }));
    }
  };

  onIncorrect = () => {
    const { deck, deck_key } = this.props;
    const { questionNumber } = this.state;

    console.log('IN-CORRECT!');
    if (deck.questions.length > questionNumber) {
      this.setState(state => ({
        incorrectCount: state.incorrectCount + 1,
        questionNumber: state.questionNumber + 1
      }));
    } else {
      this.setState(state => ({ incorrectCount: state.incorrectCount + 1 }));
    }
  };

  render() {
    const { deck, deck_key } = this.props;
    const { questionNumber } = this.state;
    const currentQuestion = deck.questions[questionNumber];

    // <QuestionCard question={currentQuestion} />
    const QuizView = () => {
      return (
        <View style={styles.container}>
          <Card question={currentQuestion} />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-around' }}
          >
            <IconButton
              onPress={this.onCorrect}
              icon="md-happy"
              size={36}
              customStyles={{ backgroundColor: '#45b718' }}
            />
            <IconButton
              onPress={this.onIncorrect}
              icon="md-sad"
              size={36}
              customStyles={{ backgroundColor: '#b73a18' }}
            />
          </View>
        </View>
      );
    };

    const ReportView = () => {
      return (
        <View>
          <Text>Finished!</Text>
        </View>
      );
    };

    return (
      <View style={styles.container}>
        <Text style={styles.header_text}>Now practicing... {deck.title}</Text>
        <Text style={styles.header_sub}>
          Question {questionNumber} of {`${deck.questions.length}`}
        </Text>
        {questionNumber < deck.questions.length ? <QuizView /> : <ReportView />}
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
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2196F3',
    flex: 1,
    height: 200,
    margin: 20,
    padding: 20
  },
  card_front: {
    backgroundColor: '#FFFF8D',
    flex: 1
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
