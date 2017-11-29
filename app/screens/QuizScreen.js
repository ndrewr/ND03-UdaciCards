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
  alarm,
  success,
  info,
  blue,
  lightPurp,
  orange,
  purple,
  red,
  pink,
  white
} from '../utils/colors';

import IconButton from '../components/IconButton';
import TextButton from '../components/TextButton';
import QuestionCard from '../components/Card';

class QuizScreen extends Component {
  state = {
    questionNumber: 1,
    correctCount: 0,
    incorrectCount: 0
  };

  onCorrect = () => {
    const { deck, deck_key } = this.props;
    const { questionNumber } = this.state;

    if (questionNumber < deck.questions.length) {
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

    if (questionNumber < deck.questions.length) {
      this.setState(state => ({
        incorrectCount: state.incorrectCount + 1,
        questionNumber: state.questionNumber + 1
      }));
    } else {
      this.setState(state => ({ incorrectCount: state.incorrectCount + 1 }));
    }
  };

  restartQuiz = () => {
    this.setState(state => ({
      correctCount: 0,
      incorrectCount: 0,
      questionNumber: 1
    }));
  };

  render() {
    const { deck, deck_key } = this.props;
    const { correctCount, incorrectCount, questionNumber } = this.state;
    const currentQuestion = deck.questions[questionNumber - 1];

    const QuizView = () => {
      return (
        <View style={styles.container}>
          <Text style={styles.header_sub}>
            Question {questionNumber} of {`${deck.questions.length}`}
          </Text>
          <QuestionCard question={currentQuestion} />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-around' }}
          >
            <IconButton
              onPress={this.onCorrect}
              icon="md-happy"
              size={36}
              name="correct"
              customStyles={{ backgroundColor: '#45b718' }}
            />
            <IconButton
              onPress={this.onIncorrect}
              icon="md-sad"
              size={36}
              name="incorrect"
              customStyles={{ backgroundColor: '#b73a18' }}
            />
          </View>
        </View>
      );
    };

    const ReportView = ({ correctCount, incorrectCount }) => {
      return (
        <View style={[styles.container, { justifyContent: 'space-between' }]}>
          <Text style={styles.header_text}>Done! Your results...</Text>
          <Text style={[styles.report_header, { backgroundColor: success }]}>
            Correct: {correctCount}
          </Text>
          <Text style={[styles.report_header, { backgroundColor: alarm }]}>
            Incorrect: {incorrectCount}
          </Text>
          <Text style={styles.report_final_score}>The Bottom-Line:</Text>
          <Text style={styles.score_percect}>
            {Math.floor(correctCount / (correctCount + incorrectCount) * 100)} %
            success
          </Text>
          <TextButton text="Restart!" onPress={this.restartQuiz} />
        </View>
      );
    };

    return (
      <View style={styles.container}>
        <Text style={styles.header_text}>Practicing... {deck.title}</Text>
        {correctCount + incorrectCount < deck.questions.length ? (
          <QuizView />
        ) : (
          <ReportView {...this.state} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  header_text: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10
  },
  header_sub: {
    fontSize: 16
  },
  report_header: {
    fontSize: 28,
    padding: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  report_final_score: {
    fontSize: 22,
    paddingTop: 20,
    marginTop: 20,
    borderBottomColor: info,
    borderBottomWidth: 4
  },
  score_percect: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: '300'
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
