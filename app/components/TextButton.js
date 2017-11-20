import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  Platform
} from 'react-native';

import { blue, lightPurp, orange, purple, white } from '../utils/colors';

export default function TextButton({
  children,
  customStyles = {},
  disabled,
  text = '',
  onPress
}) {
  const Touchable =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
  const buttonStyles = disabled
    ? [styles.button, customStyles, styles.buttonDisabled]
    : [styles.button, customStyles];
  const textStyles = disabled
    ? [styles.text, styles.textDisabled]
    : [styles.text];

  return (
    <Touchable accessibilityComponentType="button" onPress={onPress}>
      <View style={buttonStyles}>
        {children || <Text style={textStyles}>{text}</Text>}
      </View>
    </Touchable>
  );
}

const styles = StyleSheet.create({
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
