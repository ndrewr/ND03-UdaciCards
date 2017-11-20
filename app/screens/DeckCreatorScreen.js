import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform
} from 'react-native';

import { createDeck } from '../actions/decks';

import TextButton from '../components/TextButton';

class DeckCreatorScreen extends Component {
  state = {
    title_text: ''
  };

  updateText = text => {
    this.setState({ title_text: text });
  };

  createDeck = () => {
    const { title_text } = this.state;

    // TODO: add better validation
    if (title_text) {
      this.props.createNewDeck(title_text);
      Keyboard.dismiss();
      this.props.navigation.navigate('Home');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.input_label}>
          Enter the title for your new deck:
        </Text>
        <TextInput
          placeholder="My New List"
          placeholderTextColor="dimgray"
          maxLength={32}
          onChangeText={this.updateText}
          style={styles.input}
        />
        <TextButton text="Do it" onPress={this.createDeck} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 10
  },
  input: {
    fontSize: 16,
    fontWeight: '300',
    paddingBottom: 4,
    marginBottom: 40
  },
  input_label: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10
  }
});

const mapDispatchToProps = dispatch => ({
  createNewDeck: new_deck => dispatch(createDeck(new_deck))
});

export default connect(null, mapDispatchToProps)(DeckCreatorScreen);
