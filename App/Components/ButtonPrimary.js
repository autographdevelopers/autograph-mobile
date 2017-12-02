import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {Fonts, Colors} from '../Themes/';
import LinearGradient from 'react-native-linear-gradient';

export default ButtonPrimary = ({onPress, children}) => {

  const styles = StyleSheet.create({
    container: {
      height: 44,
      width: '50%',
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 5,
      paddingHorizontal: 5,
      alignSelf: 'center',
      marginBottom: 40
    },
    button: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontSize: Fonts.size.regular,
      color: Colors.snow,
      backgroundColor: 'transparent',
      textAlign: 'center'
    }
  });

  return (
    <LinearGradient start={{x: 0.0, y: 0.5}} end={{x: 1, y: 0.5}}
                    colors={[Colors.primaryCold, Colors.primaryWarm]} style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{children}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
