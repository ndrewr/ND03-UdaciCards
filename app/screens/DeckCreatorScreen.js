import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform } from 'react-native'

import { createDeck } from '../actions/decks'

class DeckCreatorScreen extends Component {
  state = {
    title_text: ''
  }

  updateText = (text) => {
    this.setState({title_text: text})
  }

  createDeck = () => {
    const { title_text } = this.state

    // TODO: add better validation
    if (title_text) {
      this.props.createNewDeck(title_text)
      Keyboard.dismiss()
      this.props.navigation.navigate('Home')
    }
  }

  render() {
    return (
      <View>
        <Text>
          Enter the title for your new deck:
        </Text>
        <TextInput
          defaultValue="My New List"
          maxLength={32}
          onChangeText={this.updateText}
        />
        <TouchableOpacity
          onPress={this.createDeck}>
          <View style={styles.button}>
            <Text style={styles.text}>
              Do It
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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

const mapDispatchToProps = dispatch => ({
  createNewDeck: new_deck => dispatch(createDeck(new_deck)),
})

export default connect(null, mapDispatchToProps)(DeckCreatorScreen)
