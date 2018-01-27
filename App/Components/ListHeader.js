import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Fonts, Colors } from '../Themes/'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonText from './ButtonText';

export default ProfileHeader = ({ navigation, title }) => {
  const styles = StyleSheet.create({
    mainContainer: {
      margin: 15,
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row'
    },
    welcomeFeed: {
      marginLeft: 15,
    },
    welcomeText: {
      fontSize: Fonts.size.regular,
      color: Colors.strongGrey,
      fontWeight: '400'
    }
  });

  return (
    <View style={styles.mainContainer}>
      <Text>{title}</Text>
      <View></View>
    </View>
  );
}
