import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { Colors } from '../Themes';

export default BubbleBackground = ({ children }) => (
  <View style={{flex: 1}}>
    <View style={styles.content}>{children}</View>
    <View style={styles.background}>
      <View style={styles.bubble5}/>
      <View style={styles.bubble4}/>
      <View style={styles.bubble3}/>
      <View style={styles.bubble2}/>
      <View style={styles.bubble1}/>
    </View>
  </View>
);

const buildBubble = size => ( {
  width: size,
  height: size,
  borderRadius: size / 2,
  backgroundColor: Colors.subtleGray,
  position: 'absolute',
} );

const styles = {
  background: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  content: {
    flex: 1,
  },
  bubble1: {
    ...buildBubble(270),
    bottom: 70,
    alignSelf: 'center',
  },
  bubble2: {
    ...buildBubble(80),
    left: 30,
    top: 95,
  },
  bubble3: {
    ...buildBubble(51),
    left: 170,
    top: 75,
  },
  bubble4: {
    ...buildBubble(39),
    left: 100,
    top: 35,
  },
  bubble5: {
    ...buildBubble(35),
    right: 60,
    top: 45,
  },
};
