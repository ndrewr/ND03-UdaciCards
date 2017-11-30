// utility functions

import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'UdaciCards:notifications';

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function formatDeckTitle(title) {
  return title
    .split(' ')
    .reduce((key_string, word) => key_string + capitalize(word), '')
    .replace(/[^\w\s]|_/g, '');
}

// Reducer state calc

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

// Notifications
// example src: github.com/udacity/reactnd-UdaciFitness-complete/tree/useLocalNotification

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

function createNotification() {
  return {
    title: 'Udacicards: Practice makes Perfect!',
    body: "👋 don't forget to practice today!  Be even more awesome!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();

            // set the notification to alert 4:30pm
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(16);
            tomorrow.setMinutes(30);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: 'day'
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
