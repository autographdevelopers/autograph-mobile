import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {  Colors } from '../Themes/'

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
