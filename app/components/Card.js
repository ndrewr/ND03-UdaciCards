// based off example from codedaily.com | codedaily.io/screencasts/12/Create-a-Flip-Card-Animation-with-React-Native
// combined w/ android bug fixes detailed at github.com/facebook/react-native/issues/1973#issuecomment-262059217

import React, { Component } from 'react';
import {
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

    // should be Android platform only?
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
    const animationSettings = {
      friction: 8,
      tension: 10
    };

    animationSettings.toValue = this.value >= 90 ? 0 : 180;
    Animated.spring(this.animatedValue, animationSettings).start();
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
        <View>
          <View>
            <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
              <Text style={[styles.cardText, styles.cardHeading]}>Q:</Text>
              <Text style={styles.cardText}>{question.question}</Text>
            </Animated.View>
            <Animated.View
              style={[styles.flipCard, backAnimatedStyle, styles.flipCardBack]}
            >
              <Text style={[styles.cardText, styles.cardHeading]}>A:</Text>
              <Text style={styles.cardText}>{question.answer}</Text>
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
    backgroundColor: '#b71845',
    backfaceVisibility: 'hidden',
    borderRadius: 10
  },
  flipCardBack: {
    backgroundColor: '#1895b7',
    position: 'absolute',
    top: 0
  },
  cardText: {
    width: 180,
    fontSize: 20,
    color: 'white',
    fontWeight: '400'
  },
  cardHeading: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});
