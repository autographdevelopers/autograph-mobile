import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Fonts, Colors } from '../../Themes/';

export default SlotLayout = props => {

  const {
    hour,
    children,
    borderLeftColor=Colors.strongGrey
  } = props;

  const styles = {
    container: {
      height: 50,
      width: '100%',
      flexDirection: 'row'
    },
    hourColumn: {
      width: 50,
      height: '100%'
    },
    body: {
      flex: 1,
      borderLeftWidth: 3,
      borderLeftColor: borderLeftColor,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: Colors.strongGrey
    },
    hour: {
      fontSize: Fonts.size.small,
      fontFamily: Fonts.type.base,
      color: Colors.softBlack,
      textAlign: 'right',
      paddingRight: 5
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.hourColumn}>
        <Text style={styles.hour}>{hour}</Text>
      </View>
      <View style={styles.body}>
        {children}
      </View>
    </View>
  );
}
