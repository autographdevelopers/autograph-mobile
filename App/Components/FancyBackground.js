import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'
import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../Themes/'
import LinearGradient from 'react-native-linear-gradient';

export default FancyBackground = ({ children }) => {
  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      ...StyleSheet.absoluteFillObject,
      opacity: 0.65,
      zIndex: 9
    },
    container: {
      flex: 1
    },
    children: {
      flex: 1,
      zIndex: 9999
    }
  });

  return (
    <View style={styles.container}>
      <Image resizeMode={'stretch'} source={require('../Images/login_pic.jpg')} style={StyleSheet.absoluteFillObject}/>
      <LinearGradient start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                      colors={[Colors.primaryCold, Colors.primaryWarm]} style={styles.overlay}/>
      <View style={styles.children}>{children}</View>
    </View>
  )
}
