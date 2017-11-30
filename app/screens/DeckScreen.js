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

import { removeQuestion } from '../actions/decks';

class QuestionEditItem extends Component {
  state = {
    confirmed: false
  };

  removeQuestion = () => {
    const { index, question, onPress } = this.props;
    const { confirmed } = this.state;

    if (confirmed) {
      // dispatch delete question action
      onPress(index);
    }

    this.setState({ confirmed: true });
  };

  render() {
    const { question } = this.props;
    const { confirmed } = this.state;

    return (
      <TouchableOpacity onPress={this.removeQuestion} style={styles.list_item}>
        <View style={{ flex: 3 }}>
          <Text style={styles.list_item_title}>{question.question}</Text>
        </View>
        <View style={styles.toolbar_item_container}>
          {confirmed && (
            <Text style={styles.question_item_confirm_label}>delete?</Text>
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

class AccordionListItem extends Component {
  state = {
    open: false
  };

  toggleOpen = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { question } = this.props;
    const { open } = this.state;

    return (
      <View style={{ margin: 10 }}>
        <TouchableOpacity
          style={styles.accordion_row}
          onPress={this.toggleOpen}
        >
          <Ionicons
            name={'md-arrow-dropdown'}
            size={32}
            style={styles.icon_button}
          />
          <Text style={styles.question_text}>Q: {question.question}</Text>
        </TouchableOpacity>
        {open && <Text style={styles.answer_text}>{question.answer}</Text>}
      </View>
    );
  }
}

class DeckScreen extends Component {
  state = {
    editMode: false
  };

  toggleEditMode = () => {
    this.setState(state => ({ editMode: !state.editMode }));
  };

  render() {
    const { deck, deck_key, navigation, deleteQuestion } = this.props;
    const { editMode } = this.state;

    const ListItem = ({ item, index }) => {
      const onPress = () => deleteQuestion(deck.title, index);
      if (editMode) {
        return (
          <QuestionEditItem question={item} index={index} onPress={onPress} />
        );
      }
      return <AccordionListItem question={item} />;
    };

    return (
      <View style={styles.container}>
        <View style={styles.toolbar_container}>
          <View style={{ flex: 3 }}>
            <Text style={styles.header_text}>{deck.title}</Text>
            <Text style={styles.header_sub}>
              {`${deck.questions.length} questions`}
            </Text>
          </View>
          {Boolean(deck.questions.length) && (
            <View style={styles.toolbar_item_container}>
              <Text>Edit list</Text>
              <Switch onValueChange={this.toggleEditMode} value={editMode} />
            </View>
          )}
        </View>
        {editMode && <Text>Now editing question list...</Text>}
        <FlatList
          data={deck.questions.map((question, index) => ({
            ...question,
            key: index
          }))}
          renderItem={ListItem}
          style={styles.list_container}
        />
        {Boolean(deck.questions.length) && (
          <TouchableOpacity
            onPress={() => navigation.navigate('QuizScreen', { deck_key })}
          >
            <View style={styles.button}>
              <Text style={styles.text}>Ok Quiz me.</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  header_text: {
    fontSize: 20,
    fontWeight: '600'
  },
  header_sub: {
    fontSize: 16,
    marginBottom: 10
  },
  question_text: {
    fontSize: 18
  },
  answer_text: {
    fontSize: 16,
    fontStyle: 'italic',
    marginLeft: 20
  },
  accordion_row: {
    flex: 1,
    flexDirection: 'row'
  },
  icon_button: {
    marginRight: 10
  },
  list_container: {
    marginBottom: 20
  },
  button: Platform.select({
    ios: {},
    android: {
      elevation: 4,
      backgroundColor: '#2196F3',
      borderRadius: 2
    }
  }),
  text: Platform.select({
    ios: {
      color: '#007AFF',
      textAlign: 'center',
      padding: 8,
      fontSize: 18
    },
    android: {
      color: white,
      textAlign: 'center',
      padding: 8,
      fontWeight: '500'
    }
  }),
  list_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 10,
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
    fontSize: 18,
    fontWeight: '400'
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
  question_item_confirm_label: {
    color: alarm,
    fontSize: 14,
    marginRight: 4
  }
});

const mapStateToProps = (state, props) => {
  const { deck_key } = props.navigation.state.params;

  return {
    deck_key,
    deck: state.decks[deck_key]
  };
};

const mapDispatchToProps = dispatch => ({
  deleteQuestion: (deck_title, question_index) =>
    dispatch(removeQuestion(deck_title, question_index))
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckScreen);
