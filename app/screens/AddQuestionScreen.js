import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import { addQuestion } from '../actions/decks';

import TextButton from '../components/TextButton';

class AddQuestionScreen extends Component {
  state = {
    question_text: '',
    answer_text: ''
  };

  updateQuestionText = text => {
    this.setState({ question_text: text });
  };

  updateAnswerText = text => {
    this.setState({ answer_text: text });
  };

  createQuestion = () => {
    const { deck_key, deck_title, addNewQuestion } = this.props;
    const { answer_text, question_text } = this.state;

    if (question_text && answer_text) {
      addNewQuestion(deck_title, answer_text, question_text);
      Keyboard.dismiss();
      this.props.navigation.goBack();
    }
  };

  render() {
    const { deck_title } = this.props;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.input_wrapper}>
          <Text style={styles.input_label}>Q:</Text>
          <TextInput
            placeholder="My new question..."
            placeholderTextColor="dimgray"
            maxLength={120}
            onChangeText={this.updateQuestionText}
            style={styles.input}
          />
        </View>
        <View style={styles.input_wrapper}>
          <Text style={styles.input_label}>A:</Text>
          <TextInput
            placeholder="The answer..."
            placeholderTextColor="dimgray"
            maxLength={240}
            onChangeText={this.updateAnswerText}
            style={styles.input}
          />
        </View>
        <Text style={styles.submit_label}>Add to "{deck_title}" deck?</Text>
        <TextButton text="Do it!" onPress={this.createQuestion} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 10
  },
  input_wrapper: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 20
  },
  input_label: {
    fontSize: 20,
    fontWeight: '600',
    marginRight: 10
  },
  input: {
    fontSize: 16,
    fontWeight: '300',
    paddingBottom: 4,
    flex: 1
  },
  submit_label: {
    margin: 20,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500'
  }
});

const mapStateToProps = (state, props) => {
  const { deck_key } = props.navigation.state.params;
  return {
    deck_key,
    deck_title: state.decks[deck_key].title
  };
};

const mapDispatchToProps = dispatch => ({
  addNewQuestion: (deck_title, answer_text, question_text) =>
    dispatch(addQuestion({ deck_title, answer_text, question_text }))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestionScreen);
