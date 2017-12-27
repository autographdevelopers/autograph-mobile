import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/';


export default CollectionGroup = () => {

  const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.snow,
      shadowOpacity: 0.15,
      shadowColor: Colors.black,
      shadowOffset: { height: 0, width: 0 },
      shadowRadius: 8,
      borderRadius: 8,
      height: 200,
      width: 200,
      marginLeft: 100
    }
  });

  return(<View style={styles.container}>

  </View>)
}
