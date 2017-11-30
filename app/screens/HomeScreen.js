import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { alarm, gray, white } from '../utils/colors';

import { removeDeck } from '../actions/decks';

class ListEditItem extends Component {
  state = {
    confirmed: false
  };

  removeDeck = () => {
    const { deck, onPress } = this.props;
    const { confirmed } = this.state;

    if (confirmed) {
      // call delete dispatch
      onPress(deck.title);
    }

    this.setState({ confirmed: true });
  };

  render() {
    const { deck } = this.props;
    const { confirmed } = this.state;

    return (
      <TouchableOpacity onPress={this.removeDeck} style={styles.list_item}>
        <View>
          <Text style={styles.list_item_title}>{deck.title}</Text>
          <Text style={styles.list_item_sub}>
            {`${deck.questions.length} questions`}
          </Text>
        </View>
        <View style={styles.toolbar_item_container}>
          {confirmed && (
            <Text style={styles.list_item_confirm_label}>delete?</Text>
          )}
          <Ionicons
            name="md-remove-circle"
            size={32}
            style={{ color: alarm }}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

class HomeScreen extends Component {
  state = {
    editMode: false
  };

  toggleEditMode = () => {
    this.setState(state => ({ editMode: !state.editMode }));
  };

  render() {
    const { decks, navigation, deleteDeck } = this.props;
    const { editMode } = this.state;

    const deck_list = Object.keys(decks).map(deck_key => ({
      ...decks[deck_key],
      key: deck_key
    }));

    const ListNavItem = ({ item: deck }) => {
      const gotoDeck = () =>
        navigation.navigate('DeckScreen', { deck_key: deck.key });

      return (
        <TouchableOpacity onPress={gotoDeck} style={styles.list_item}>
          <View>
            <Text style={styles.list_item_title}>{deck.title}</Text>
            <Text style={styles.list_item_sub}>
              {`${deck.questions.length} questions`}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    const ListItem = editMode
      ? ({ item }) => <ListEditItem deck={item} onPress={deleteDeck} />
      : ListNavItem;

    return (
      <View style={styles.container}>
        <View style={styles.toolbar_container}>
          <Text>Choose a deck, any deck!</Text>
          <View style={styles.toolbar_item_container}>
            <Text>Edit list</Text>
            <Switch onValueChange={this.toggleEditMode} value={editMode} />
          </View>
        </View>
        {editMode && <Text>Now editing list...</Text>}
        <FlatList
          data={deck_list}
          renderItem={ListItem}
          style={styles.list_container}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 20
  },
  list_container: {
    marginBottom: 20
  },
  list_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  list_item_title: {
    fontSize: 20,
    fontWeight: '600'
  },
  list_item_sub: {
    fontSize: 16,
    color: gray
  },
  toolbar_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  toolbar_item_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  list_item_confirm_label: {
    color: alarm,
    fontSize: 14,
    marginRight: 4
  }
});

const mapStateToProps = state => {
  return {
    decks: state.decks
  };
};

const mapDispatchToProps = dispatch => ({
  deleteDeck: deck_title => dispatch(removeDeck(deck_title))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
