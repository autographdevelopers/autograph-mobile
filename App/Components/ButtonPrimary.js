import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/';
import LinearGradient from 'react-native-linear-gradient';

const THEMES = { PRIMARY: 'primary', WARNING: 'warning' };

export default ButtonPrimary = ({ onPress,
                                  children,
                                  submitting=false,
                                  float=false,
                                  theme=THEMES.PRIMARY,
                                  customWrapperStyles={},
                                  customBgStyle={}}) => {

  const BOTTOM_OFFSET = 20;

  const styles = StyleSheet.create({
    bg: {
      paddingVertical: 5,
      paddingHorizontal: 5,
      borderRadius: 50,
      flex: 1,
      shadowColor: Colors.black,
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 1,
      shadowOffset: { width: 0, height: 2 },
    },
    button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: Fonts.size.regular,
      fontFamily: Fonts.type.base,
      color: Colors.snow,
      fontWeight: '600',
      backgroundColor: 'transparent',
      textAlign: 'center'
    },
    wrapper: {
      height: 44,
      alignSelf: 'center',
      width: '50%',
      backgroundColor: 'transparent',
      justifyContent: 'center',
    },
    wrapperFloat: {
      position: 'absolute',
      zIndex: 9999999,
      bottom: BOTTOM_OFFSET,
    },
    wrapperNoFloat: {
      marginBottom: BOTTOM_OFFSET,
    }
  });

  const Spinner = () => (
    <ActivityIndicator size={'large'} color={Colors.primaryWarm}/>
  );

  const gradientCoords = {
    start: { x: 0.0, y: 0.5 },
    end: { x: 1.0, y: 0.5 }
  };

  const gradientThemes = {
    primary: [Colors.primaryCold, Colors.primaryWarm],
    warning: [Colors.yellowLight, Colors.yellowDark]
  };

  const Button = () => (
    <LinearGradient {...gradientCoords} colors={gradientThemes[theme]} style={[styles.bg, customBgStyle]}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.title}>{children}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );

  return (
    <View style={[ styles.wrapper, [styles.wrapperNoFloat, styles.wrapperFloat][+float], customWrapperStyles ]}>
      { submitting ? <Spinner/> : <Button/> }
    </View>
  );
}
