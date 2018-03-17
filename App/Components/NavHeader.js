import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Fonts, Colors } from '../Themes/'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';

export default NavHeader = ({ navigation, title, back = true, rightIcon, onRightIconPress }) => {
  const displayLeftButton = () => {
    if(back) {
      return (
        <TouchableOpacity onPress={() => navigation.goBack(null)}><FontAwesomeIcon name={'angle-left'} size={30}
                                                                        color={Colors.snow}/></TouchableOpacity>
      )
    }
  };

  const displayRightButton  = () => {
    if(rightIcon) {
      return (
        <TouchableOpacity onPress={onRightIconPress} style={{alignSelf: 'center'}}>
          {rightIcon}
        </TouchableOpacity>
      )
    } else {
      return null;
    }
  };

  const styles = StyleSheet.create({
    mainContainer: {
      height: 64,
      paddingBottom: 12,
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      flexDirection: 'row'
    },
    leftContainer: {
      width: 25,
      backgroundColor: 'transparent'
    },
    rightContainer: {
      width: 25,
      backgroundColor: 'transparent',
    },
    title: {
      textAlign: 'center',
      color: Colors.snow,
      fontSize: Fonts.size.regular,
      backgroundColor: 'transparent'
    },
    wrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 15
    }
  });

  return (
    <LinearGradient start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                    colors={[Colors.primaryCold, Colors.primaryWarm]} style={styles.mainContainer}>
      <View style={styles.wrapper}>

        <View style={styles.leftContainer}>
          {displayLeftButton()}
        </View>

        <Text style={styles.title}>{title}</Text>

        <View style={styles.rightContainer}>
          {displayRightButton()}
        </View>
      </View>
    </LinearGradient>
  );
}
