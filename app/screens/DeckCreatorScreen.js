import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';

import { alarm } from '../utils/colors';
import { formatDeckTitle } from '../utils/helpers';

import { createDeck } from '../actions/decks';

import TextButton from '../components/TextButton';

class DeckCreatorScreen extends Component {
  state = {
    show_error: false,
    title_text: ''
  };

  updateText = text => {
    this.setState({ show_error: false, title_text: text });
  };

  createDeck = () => {
    const { createNewDeck, validateDeckTitle } = this.props;
    const { title_text } = this.state;

    if (title_text) {
      // is deck title already in use? If so show error text
      if (!validateDeckTitle(title_text)) {
        this.setState({ show_error: true });
        return;
      }

      // route action to Deck Detail screen for new deck; back btn will lead Home
      const routeOnCreate = () => {
        const routeAction = NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: 'Home' }),
            NavigationActions.navigate({
              routeName: 'DeckScreen',
              params: { deck_key: formatDeckTitle(title_text) }
            })
          ]
        });
        this.props.navigation.dispatch(routeAction);
      };

      createNewDeck(title_text, routeOnCreate);
      Keyboard.dismiss();
    }
  };

  render() {
    const { show_error } = this.state;
    const errorVisibility = [styles.error_section];

    // display error message if invalid deck name was entered
    if (show_error) {
      errorVisibility.push({ opacity: 1 });
    }

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
        <View style={errorVisibility}>
          <Ionicons name="md-warning" size={32} style={{ color: alarm }} />
          <Text style={styles.error_text}>
            This deck title is already in use!
          </Text>
        </View>
        <TextButton
          style={{ marginTop: 40 }}
          text="Do it"
          onPress={this.createDeck}
        />
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
    paddingBottom: 4
  },
  input_label: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10
  },
  error_section: {
    padding: 10,
    alignItems: 'center',
    opacity: 0,
    marginBottom: 20
  },
  error_text: {
    fontSize: 18,
    color: alarm
  }
});

const mapStateToProps = state => {
  const { decks } = state;
  return {
    validateDeckTitle: new_title => {
      return !Object.keys(decks).includes(formatDeckTitle(new_title));
    }
  };
};

const mapDispatchToProps = dispatch => ({
  createNewDeck: (new_deck, onCreate) =>
    dispatch(createDeck(new_deck, onCreate))
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckCreatorScreen);
