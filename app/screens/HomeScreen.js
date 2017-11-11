import React from 'react'
import { Button, FlatList, Text, TouchableOpacity, View, Platform } from 'react-native'
// import { purple, white } from './utils/colors'

export default function HomeScreen (props) {
  const decks = [
    { title: 'list one' },
    { title: 'list two' },
    { title: 'list three' },
    { title: 'list four' },
    { title: 'list five' }
  ]

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
