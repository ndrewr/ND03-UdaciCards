import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform } from 'react-native'

import { addQuestion } from '../actions/decks'

class AddQuestionScreen extends Component {
  state = {
    question_text: '',
    answer_text: '',
  }

  updateText = (text) => {
    this.setState({question_text: text})
  }

  createQuestion = () => {
    const { deck_key, deck_title } = this.props
    const { answer_text, question_text } = this.state

    console.log('create question validation...')
    if (question_text) {
      console.log('create this question with text...', this.state.question_text)

      // this.props.createNewDeck(question_text)
      this.props.addNewQuestion(deck_title, answer_text, question_text)

      Keyboard.dismiss()
      // this.props.navigation.navigate('DeckScreen', { deck_key })
      this.props.navigation.goBack()
    }
  }

  render() {
    const { deck_title } = this.props

    return (
      <View style={styles.container}>
        <Text>
          Enter the question text:
        </Text>
        <TextInput
          defaultValue="My new question..."
          maxLength={120}
          onChangeText={this.updateText}
        />
        <Text>
          Enter the answer text:
        </Text>
        <TextInput
          defaultValue="The answer..."
          maxLength={300}
          onChangeText={this.updateText}
        />
        <Text>
          Add this question to "{deck_title}" deck?
        </Text>
        <TouchableOpacity
          onPress={this.createQuestion}>
          <View style={styles.button}>
            <Text style={styles.text}>
              Do it!
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
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
  // createNewDeck: new_deck => dispatch(createDeck(new_deck)),
  addNewQuestion: (deck_title, question_text, answer_text) => dispatch(addQuestion({ deck_title, answer_text, question_text })),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestionScreen)
