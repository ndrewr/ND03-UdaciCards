import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native'

import { gray, purple, white } from '../utils/colors'

function HomeScreen ({ decks, navigation }) {
  const deck_list = Object.keys(decks).map(deck_key => ({ ...decks[deck_key], key: deck_key}))

  const ListItem = ({item: deck}) => {
    const gotoDeck = () => navigation.navigate('DeckScreen', { deck_key: deck.key })
    // console.log('render this item: ', deck)
    return (
      <TouchableOpacity
        onPress={gotoDeck}
        style={styles.list_item}
      >
        <Text style={styles.list_item_title}>
          {deck.title}
        </Text>
        <Text style={styles.list_item_sub}>
          {`${deck.questions.length} questions`}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Text>Choose a deck, any deck!</Text>
      <FlatList
        data={deck_list}
        renderItem={ListItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  list_item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  list_item_title: {
    // width: 200,
    fontSize: 20,
    fontWeight: '600',
  },
  list_item_sub: {
    fontSize: 16,
    color: gray,
  }
})

const mapStateToProps = (state) => {
  return {
    // decks: state.decks ? Object.keys(state.decks).map(deck_name => state.decks[deck_name]) : null
    decks: state.decks
  }
}

export default connect(mapStateToProps)(HomeScreen)
