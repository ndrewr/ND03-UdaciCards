import React from 'react';
import { View, StatusBar } from 'react-native';
import { Constants } from 'expo';

import { purple } from '../utils/colors';

export default function UdaciStatusBar({ backgroundColor = purple, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}
