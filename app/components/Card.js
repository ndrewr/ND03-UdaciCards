// based off example from codedaily.com | codedaily.io/screencasts/12/Create-a-Flip-Card-Animation-with-React-Native

import React, { Component } from 'react';
import {
  // AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated
} from 'react-native';

export default class Card extends Component {
  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    });
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    });

    // from github.com/facebook/react-native/issues/1973#issuecomment-262059217
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    });
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    });
  }
  flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }
  }

  render() {
    const { question } = this.props;

    const frontAnimatedStyle = {
      transform: [{ rotateY: this.frontInterpolate }],
      opacity: this.frontOpacity
    };
    const backAnimatedStyle = {
      transform: [{ rotateY: this.backInterpolate }],
      opacity: this.backOpacity
    };
    return (
      <TouchableOpacity
        onPress={() => this.flipCard()}
        style={styles.container}
      >
        <View style={styles.container}>
          <View>
            <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
              <Text style={styles.flipText}>Q:</Text>
              <Text style={styles.flipText}>{question.question}</Text>
            </Animated.View>
            <Animated.View
              style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}
            >
              <Text style={styles.flipText}>A:</Text>
              <Text style={styles.flipText}>{question.answer}</Text>
            </Animated.View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  flipCard: {
    width: 240,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
    backgroundColor: '#b71845',
    backfaceVisibility: 'hidden'
  },
  flipCardBack: {
    // backgroundColor: "red",
    backgroundColor: '#1895b7',
    position: 'absolute',
    top: 0
  },
  flipText: {
    width: 180,
    fontSize: 20,
    color: 'white',
    fontWeight: '400'
  }
});

// AppRegistry.registerComponent('animatedbasic', () => animatedbasic);
