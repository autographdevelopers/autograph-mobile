import React, { Component } from 'react';
import { Text, View, Switch } from 'react-native';
import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/';

export default CellWithSwitch = ({ label, value, onChangehandler, description }) => {

  const styles = StyleSheet.create({
    container: {
      paddingVertical: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      // width: '100%',
      minHeight:   64,
      borderBottomColor: Colors.lightGrey,
      borderBottomWidth: 1
    },
    infoBox: {
      flexDirection: 'column',
      justifyContent: 'center',
      flexGrow: 1,
      flex:1,
    },
    label: {
      color: Colors.black,
      fontSize: Fonts.size.regular
    },
    description: {
      color: Colors.strongGrey,
      fontSize: Fonts.size.small,
    },
    switchBox: {
      justifyContent: 'center',
      marginLeft: 15
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.infoBox}>
        <Text style={styles.label}>{label}</Text>
        {description && <Text style={styles.description}>{description}</Text> }
      </View>
      <View style={styles.switchBox}>
        <Switch onValueChange={onChangehandler} value={value}/>
      </View>
    </View>
  );
}
