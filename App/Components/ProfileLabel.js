import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/';
import DefaultAvatar from './DefaultAvatar';

export default ProfileLabel = ({ avatarProps, user }) => {

  const styles = {
    container: {
      flexDirection: 'row',
      // paddingHorizontal: 15,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: Colors.lightGrey
    },
    leftCol: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '20%',
    },
    rightCol: {
      flex: 1,
      justifyContent: 'center'
    },
    primaryInfo: {
      color: Colors.softBlack,
      fontSize: Fonts.size.regular,
      fontWeight: 'bold',
    },
    secondaryInfo: {
      color: Colors.strongGrey,
      fontSize: Fonts.size.medium,
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftCol}>
        <DefaultAvatar {...avatarProps} />
      </View>
      <View style={styles.rightCol}>
        <Text style={styles.primaryInfo}>{`${user.name} ${user.surname}`}</Text>
      </View>
    </View>
  );
};
