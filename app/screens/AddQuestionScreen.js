import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, FlatList, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform } from 'react-native'

import { addQuestion } from '../actions/decks'

class AddQuestionScreen extends Component {
  state = {
    question_text: '',
    answer_text: '',
  }

  updateQuestionText = (text) => {
    this.setState({ question_text: text })
  }

  updateAnswerText = (text) => {
    this.setState({ answer_text: text })
  }

  dismissKeyboard() {
    console.log('blur!')
    Keyboard.dismiss()
  }

  createQuestion = () => {
    const { deck_key, deck_title } = this.props
    const { answer_text, question_text } = this.state

    console.log('create question validation...')
    if (question_text && answer_text) {
      console.log('create this question with text...', this.state.question_text)

      this.props.addNewQuestion(deck_title, answer_text, question_text)

      Keyboard.dismiss()
      // this.props.navigation.navigate('DeckScreen', { deck_key })
      this.props.navigation.goBack()
    }
  }

  render() {
    const { deck_title } = this.props

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.input_wrapper}>
          <Text style={styles.input_label}>
            Q:
          </Text>
          <TextInput
            placeholder="My new question..."
            placeholderTextColor="dimgray"
            maxLength={120}
            onBlur={this.dismissKeyboard}
            onChangeText={this.updateQuestionText}
            style={styles.input}
          />
        </View>
        <View style={styles.input_wrapper}>
          <Text style={styles.input_label}>
            A:
          </Text>
          <TextInput
            placeholder="The answer..."
            placeholderTextColor="dimgray"
            maxLength={300}
            onBlur={this.dismissKeyboard}
            onChangeText={this.updateAnswerText}
            style={styles.input}
          />
        </View>
        <Text style={styles.submit_label}>
          Add to "{deck_title}" deck?
        </Text>
        <TouchableOpacity
          onPress={this.createQuestion}>
          <View style={styles.button}>
            <Text style={styles.text}>
              Do it!
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
  },
  input_wrapper: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
  },
  input_label: {
    fontSize: 20,
    fontWeight: '600',
    marginRight: 10,
  },
  input: {
    fontSize: 16,
    fontWeight: '300',
    paddingBottom: 4,
    flex: 1,
  },
  submit_label: {
    margin: 20,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  button: Platform.select({
    ios: {},
    android: {
      elevation: 4,
      // Material design blue from https://material.google.com/style/color.html#color-color-palette
      backgroundColor: '#2196F3',
      borderRadius: 2,
    },
  }),
  text: Platform.select({
    ios: {
      // iOS blue from https://developer.apple.com/ios/human-interface-guidelines/visual-design/color/
      color: '#007AFF',
      textAlign: 'center',
      padding: 8,
      fontSize: 18,
    },
    android: {
      color: 'white',
      textAlign: 'center',
      padding: 8,
      fontWeight: '500',
    },
  }),
  buttonDisabled: Platform.select({
    ios: {},
    android: {
      elevation: 0,
      backgroundColor: '#dfdfdf',
    }
  }),
  textDisabled: Platform.select({
    ios: {
      color: '#cdcdcd',
    },
    android: {
      color: '#a1a1a1',
    }
  }),
});

const mapStateToProps = (state, props) => {
  const { deck_key } = props.navigation.state.params
  return {
    deck_key,
    deck_title: state.decks[deck_key].title,
  }
}

const mapDispatchToProps = dispatch => ({
  addNewQuestion: (deck_title, answer_text, question_text) => dispatch(addQuestion({ deck_title, answer_text, question_text })),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestionScreen)
