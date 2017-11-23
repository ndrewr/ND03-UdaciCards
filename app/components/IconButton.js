import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { blue, lightPurp, orange, purple, white } from '../utils/colors';

export default function IconButton({
  customStyles = {},
  disabled,
  icon = 'md-checkmark-circle',
  size = 32,
  text = '',
  onPress
}) {
  const buttonStyles = disabled
    ? [styles.button, customStyles, styles.buttonDisabled]
    : [styles.button, customStyles];
  const textStyles = disabled
    ? [styles.text, styles.textDisabled]
    : [styles.text];

  return (
    <TouchableHighlight
      accessibilityComponentType="button"
      style={buttonStyles}
      onPress={onPress}
    >
      <View style={buttonStyles}>
        <Ionicons name={icon} size={size} style={styles.icon} />
        {text ? <Text style={textStyles}>{text}</Text> : null}
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  icon: {
    color: 'white',
    alignSelf: 'center'
  },
  button: Platform.select({
    ios: {
      width: 50,
      height: 44,

      padding: 5,
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    android: {
      width: 50,
      height: 44,
      padding: 5,
      elevation: 4,
      backgroundColor: '#2196F3',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5
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
      color: 'white',
      textAlign: 'center',
      padding: 8,
      fontWeight: '500'
    }
  }),
  buttonDisabled: Platform.select({
    ios: {},
    android: {
      elevation: 0,
      backgroundColor: '#dfdfdf'
    }
  }),
  textDisabled: Platform.select({
    ios: {
      color: '#cdcdcd'
    },
    android: {
      color: '#a1a1a1'
    }
  })
});
