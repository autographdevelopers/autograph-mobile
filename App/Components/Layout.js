import React, {Component} from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';

export default Layout = ({children}) => {
  const styles = StyleSheet.create({
    layout: {
      flex:1,
      paddingHorizontal: 15,
      paddingTop: 15
    }
  });

  return (
    <View style={styles.layout}>{children}</View>
  );
}
