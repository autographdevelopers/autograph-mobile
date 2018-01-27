import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Fonts, Colors } from '../Themes/';

export default ListHeader = ({ title }) => {

  const styles = {
    container: {
      backgroundColor: Colors.lightGrey,
      height: 44,
      justifyContent: 'center',
      paddingLeft: 15
    },
    title: {
      color: Colors.strongGrey,
      fontSize: Fonts.size.medium
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title.toUpperCase()}</Text>
    </View>
  );
};
