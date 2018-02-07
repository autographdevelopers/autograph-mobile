import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/';

export default DefaultAvatar = ({ name, index, customContainerStyle={}, customLetterStyle={}, aniamationable=false }) => {
  const COLORS_PIPELINE = [
    Colors.purple, Colors.yellow, Colors.blue, Colors.salmon, Colors.primaryWarm
  ];

  const pipeSize = COLORS_PIPELINE.length;
  const SIZE = aniamationable ? '100%' : 40;

  const styles ={
    container: {
      marginRight: 15, /** because list-item does not give space between left icon and text */
      width: SIZE,
      height: SIZE,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-start',
      backgroundColor: COLORS_PIPELINE[index%pipeSize]
    },
    letter: {
      fontSize: Fonts.size.regular,
      fontFamily: Fonts.type.base,
      color: Colors.snow,
    }
  };

  return (
    <View style={[styles.container, customContainerStyle]}>
      <Text style={[styles.letter, customLetterStyle]}>{name[0].toUpperCase()}</Text>
    </View>
  )
}
