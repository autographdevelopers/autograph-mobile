import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Fonts, Colors } from '../Themes/'
import Icon from 'react-native-vector-icons/FontAwesome';

export default NavHeader = ({ navigation, title }) => {
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
      backgroundColor: 'transparent'
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
          <TouchableOpacity onPress={() => navigation.goBack()}><Icon name={'angle-left'} size={30}
                                                                      color={Colors.snow}/></TouchableOpacity>
        </View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.rightContainer}/>
      </View>
    </LinearGradient>
  );
}
