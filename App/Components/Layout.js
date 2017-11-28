import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {StyleSheet} from 'react-native';

export default Layout = ({children}) => {
  const styles = StyleSheet.create({
    layout: {
      flex:1,
      paddingHorizontal: 15,
      paddingTop: 20
    }
  });

  return (
    <ScrollView style={styles.layout}>{children}</ScrollView>
  );
}
