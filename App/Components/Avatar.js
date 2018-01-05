import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/';
import Icon from 'react-native-vector-icons/FontAwesome';

export default Avatar = ({ src }) => {

  const styles = StyleSheet.create({
    avatar: {
      borderRadius: 5,
      width: 40,
      height: 40
    },
    container: {
      marginRight: 15
    }
  });

  return (<View style={styles.container}>
    { src && src.uri ? <Image source={src} style={styles.avatar}/> : <Icon name={'user-circle-o'} size={38} color={Colors.strongGrey} /> }
  </View>
  )
}
