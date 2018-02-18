import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/';
import LinearGradient from 'react-native-linear-gradient';

export default ButtonPrimary = ({ onPress, children, submitting=false, float=false }) => {

  const styles = StyleSheet.create({
    container: {
      borderRadius: 50,
      paddingVertical: 5,
      paddingHorizontal: 5,
      width: '100%',
      height: '100%'
    },
    button: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontSize: Fonts.size.regular,
      fontFamily: Fonts.type.base,
      color: Colors.snow,
      backgroundColor: 'transparent',
      textAlign: 'center'
    },
    wrapper: {
      height: 44,
      alignSelf: 'center',
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    wrapperFloat: {
      position: 'absolute',
      bottom: 20,
    },
    wrapperNoFloat: {
      marginBottom: 20,
    }
  });

  return (
    <View style={[styles.wrapper, (float ? styles.wrapperFloat: styles.wrapperNoFloat)]}>
      { submitting ?
        <ActivityIndicator size={'large'} color={Colors.primaryWarm}/>
        :
        <LinearGradient start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                        colors={[Colors.primaryCold, Colors.primaryWarm]} style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{children}</Text>
          </TouchableOpacity>
        </LinearGradient>
      }
    </View>
  );
}
