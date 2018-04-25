import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Fonts, Colors } from '../Themes/'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';

export default () => (
  <LinearGradient start={{ x: 0.0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  colors={[Colors.primaryCold, Colors.primaryWarm]}
                  style={styles.bg}
  />
)

const styles = {
  bg: {
    flex: 1
  }
};
