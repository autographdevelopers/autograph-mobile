import React, { Component } from 'react';
import { Text, TouchableOpacity, Animated, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/';

export default Bubble = ({ active, label='Label', onPress=()=>{}, customStyle }) => {
  const SIZE= 25;
  const styles = StyleSheet.create({
    text: {
      color: Colors.softBlack,
      fontSize: Fonts.size.small,
      fontFamily: Fonts.type.base
    },
    button: {
      width: SIZE,
      height: SIZE,
      borderRadius: 50,
      backgroundColor: active ? Colors.primaryWarm : Colors.lightGrey,
      marginBottom: 5
    },
    container: {
      alignItems: 'center'
    }
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, customStyle]} onPress={onPress}>
      </TouchableOpacity>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}
