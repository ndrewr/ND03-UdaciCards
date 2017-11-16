import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native'

//  ☐ displays an option to start a quiz on this specific deck
//  ☐ An option to add a new question to the deck
class DeckScreen extends Component {
  render() {
    const { deck, navigation } = this.props

    // const { title } = navigation.state.params
    const QuestionItem = ({ item: question }) => (
      <View style={{ margin: 10 }}>
        <Text>Question: {question.question}</Text>
        <Text>Answer: {question.answer}</Text>
      </View>
    )

    return (
      <View style={styles.container}>
        <Text style={styles.header_text}>
          {deck.title}
        </Text>
        <Text style={styles.header_sub}>
          {`${deck.questions.length} questions`}
        </Text>
        <FlatList
          data={deck.questions.map((question, index) => ({ ...question, key: index }))}
          renderItem={QuestionItem}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header_text: {
    fontSize: 20,
  },
  header_sub: {
    fontSize: 16,
  }
})

const mapStateToProps = (state, props) => {
  const { deck_key } = props.navigation.state.params

  return {
    deck: state.decks[deck_key],
  }
}

export default connect(mapStateToProps, null)(DeckScreen)
