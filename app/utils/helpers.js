// utility functions

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function formatDeckTitle(title) {
  return title
    .split(' ')
    .reduce((key_string, word) => key_string + capitalize(word), '')
    .replace(/[^\w\s]|_/g, '');
}

export function removeDeckFromState(decks, deck_title) {
  const decks_copy = { ...decks };
  const deck_key = formatDeckTitle(deck_title);

  decks_copy[deck_key] = undefined;
  delete decks_copy[deck_key];

  return decks_copy;
}

export function addQuestionToState(decks, deck_title, new_card) {
  const deck_key = formatDeckTitle(deck_title);
  const updated_deck = {
    title: deck_title,
    questions: [...decks[deck_key].questions, new_card]
  };

  return {
    ...decks,
    [deck_key]: updated_deck
  };
}

export function removeQuestionFromState(decks, deck_title, question_index) {
  const deck_key = formatDeckTitle(deck_title);
  const target_deck = decks[deck_key];
  const updated_deck = {
    title: deck_title,
    questions: target_deck.questions.reduce(
      (question_list, question, index) => {
        if (index !== question_index) {
          question_list.push(question);
        }
        return question_list;
      },
      []
    )
  };

  return {
    ...decks,
    [deck_key]: updated_deck
  };
}
