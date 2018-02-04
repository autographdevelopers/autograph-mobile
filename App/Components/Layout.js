import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {StyleSheet} from 'react-native';
import { Colors } from '../Themes';

export default Layout = ({children, customStyles = {}, scroll=true}) => {
  const styles = StyleSheet.create({
    layout: {
      flex: 1,
      paddingHorizontal: 15,
      paddingTop: 20,
      backgroundColor: Colors.snow
    }
  });

  const body = scroll ?
    (<ScrollView style={{flex:1}} contentContainerStyle={[styles.layout, customStyles]}>
      {children}
    </ScrollView>)
    :
    (<View style={[styles.layout, customStyles]}>
      {children}
    </View>);

  return body;
}
