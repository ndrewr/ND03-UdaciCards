import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native'

import { gray, purple, white } from '../utils/colors'

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

function HomeScreen (props) {
  const dummy_decks = [
    { title: 'list one' },
    { title: 'list two' },
    { title: 'list three' },
    { title: 'list four' },
    { title: 'list five' }
  ]
  const decks = props.decks || dummy_decks

  const gotoDeck = (item) =>
    () =>
      props.navigation.navigate(
        'DeckScreen',
        { deck: item, title: item.title }
      )

  const ListItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={gotoDeck(item)}
        style={styles.list_item}
      >
        <Text style={styles.list_item_title}>
          {item.title}
        </Text>
        <Text style={styles.list_item_sub}>
          {`${item.questions ? item.questions.length : 0} questions`}
        </Text>
      </TouchableOpacity>
    )
  }

  // TODO: add "new deck" navigation button
  return (
    <View style={styles.container}>
      <Text>Choose a deck, any deck!</Text>
      <FlatList
        data={decks.map(item => ({...item, key: item.title}))}
        renderItem={ListItem}
      />
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    decks: state.decks ? Object.keys(state.decks).map(deck_name => state.decks[deck_name]) : null
  }
}

export default connect(mapStateToProps)(HomeScreen)
