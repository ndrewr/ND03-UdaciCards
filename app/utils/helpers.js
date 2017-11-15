// utility functions

function capitalize (word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function formatDeckTitle (title) {
  return title.split(' ').reduce((key_string, word) => key_string + capitalize(word), '')
}
