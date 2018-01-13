import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {StyleSheet} from 'react-native';
import { Colors } from '../Themes';

export default Layout = ({children, customStyles = {}}) => {
  const styles = StyleSheet.create({
    layout: {
      flex: 1,
      paddingHorizontal: 15,
      paddingTop: 20,
      backgroundColor: Colors.snow
    }
  });

  return (
    <ScrollView contentContainerStyle={[styles.layout, customStyles]}>
      {children}
    </ScrollView>
  );
}
