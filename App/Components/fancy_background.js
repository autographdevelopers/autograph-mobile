import React, {Component} from 'react'
import {View, Image, Text} from 'react-native'
import {StyleSheet} from 'react-native'
import {Fonts, Colors, Metrics} from '../Themes/'

export default FancyBackground = ({children}) => {
  const styles = StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: Colors.primary,
      opacity: 0.78,
      zIndex: 1
    },
    container: {
      flex: 1
    },
    children: {
      flex: 1,
      zIndex: 9999
    }
  });

  const resizeMode = 'center';

  return (
    <View style={styles.container}>
      <Image resizeMode={'stretch'} source={require('../Images/login_pic.jpg')} style={StyleSheet.absoluteFillObject}/>
      <View style={styles.overlay}/>
      <View style={styles.children}>{children}</View>
    </View>
  )
}
