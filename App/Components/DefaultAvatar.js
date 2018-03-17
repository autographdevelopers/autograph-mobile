import React, { Component } from 'react';
import { Text, View, Animated} from 'react-native';
import { Fonts, Colors } from '../Themes/';

export default DefaultAvatar = props => {
  const {
    name,
    index,
    customContainerStyle={},
    customLetterStyle={}
  } = props;

  const COLORS_PIPELINE = [
    Colors.purple, Colors.yellow, Colors.blue, Colors.salmon, Colors.primaryWarm
  ];

  const SIZE = 40;

  const styles = {
    container: {
      marginRight: 15, /** because list-item does not give space between left icon and text */
      width: SIZE,
      height: SIZE,
      borderRadius: 9999999,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: COLORS_PIPELINE[index%COLORS_PIPELINE.length]
    },
    letter: {
      fontSize: Fonts.size.regular,
      fontFamily: Fonts.type.base,
      color: Colors.snow,
    }
  };

  return (
    <Animated.View style={[styles.container, customContainerStyle]}>
      <Animated.Text style={[styles.letter, customLetterStyle]}>{name[0].toUpperCase()}</Animated.Text>
    </Animated.View>
  )
}
