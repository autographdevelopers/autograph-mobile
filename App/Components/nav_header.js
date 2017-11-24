import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';


export default NavHeader = (props) => {

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 80,
      backgroundColor: 'red'
    },
    leftContainer: {
      width: 25,
      backgroundColor: 'green'
    },
    rightContainer: {
      width: 25,
      backgroundColor: 'blue'
    },
    middleContainer: {
      flex: 1,
      backgroundColor: 'pink'
    }

  });

  return (
    <View style={styles.mainContainer}>
      <View style={styles.leftContainer}></View>
      <View style={styles.middleContainer}></View>
      <View style={styles.rightContainer}></View>
    </View>
  );
}
