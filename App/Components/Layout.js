import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {StyleSheet} from 'react-native';
import { Colors } from '../Themes';

export default Layout = ({children}) => {
  const styles = StyleSheet.create({
    layout: {
      // flex:1, // needed? breaks step form
      paddingHorizontal: 15,
      paddingTop: 20,
      backgroundColor: Colors.snow
    }
  });

  return (
    <ScrollView style={styles.layout}>{children}</ScrollView>
  );
}
