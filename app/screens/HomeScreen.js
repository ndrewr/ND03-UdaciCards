import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button, FlatList, Text, TouchableOpacity, View, Platform } from 'react-native'
// import { purple, white } from './utils/colors'

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
      >
        <Text>
          { item.title }
        </Text>
      </TouchableOpacity>
    )
  }

  // TODO: add "new deck" navigation button
  return (
    <View>
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
