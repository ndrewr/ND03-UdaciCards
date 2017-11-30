import React from 'react';
import {
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  Platform
} from 'react-native';

import { white } from '../utils/colors';

export default function HeaderCreateButton({ label = '+', onPress }) {
  const Touchable =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <Touchable accessibilityComponentType="button" onPress={onPress}>
      <View
        style={{ backgroundColor: 'transparent', marginRight: 20, padding: 10 }}
      >
        <Text style={{ color: white, fontSize: 20, textAlign: 'center' }}>
          {label}
        </Text>
      </View>
    </Touchable>
  );
}
