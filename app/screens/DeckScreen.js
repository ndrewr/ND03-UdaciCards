import React from 'react'
import { Button, FlatList, Text, TouchableOpacity, View, Platform } from 'react-native'

export default function DeckScreen ({ navigation }) {
  return (
    <View>
      <Text>
        DETAILS: {navigation.state.params.title}
      </Text>
    </View>
  )
}
