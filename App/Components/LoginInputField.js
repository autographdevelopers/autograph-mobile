import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics } from '../Themes/';

import Icon from 'react-native-vector-icons/Ionicons';


export default LoginInputField = ({label, icon, value, handleTextChange, placeholder, secure}) => {

  const styles = StyleSheet.create({
    container: {
      marginTop: Metrics.doubleBaseMargin,
      alignItems:'center',
      backgroundColor: Colors.transparent
    },
    grouper: {
      width: '85%',
    },
    label: {
      color: Colors.snow,
      backgroundColor: Colors.transparent,
      fontSize: Fonts.size.small,
      fontWeight: 'bold',
      marginBottom: 11
    },
    input: {
      borderRadius: 5,
      height: 50,
      color: Colors.softBlack,
      fontSize: Fonts.size.medium,
      backgroundColor: Colors.snow,
      paddingLeft: 54
    },
    iconBox: {
      position: 'absolute',
      left: 15,
      width: 24,
      height: 24,
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    },
    inputRow: {
      justifyContent: 'center',
      position: 'relative'
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.grouper}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputRow}>
          <View style={styles.iconBox}>
            <Icon name={icon} size={24} color={Colors.strongGrey}/>
          </View>
          <TextInput style={styles.input}
                     value={value}
                     onChangeText={handleTextChange}
                     autoCapitalize={'none'}
                     autoFocus={true}
                     placeholder={placeholder}
                     secureTextEntry={secure}>
          </TextInput>
        </View>
      </View>
    </View>
  );
}
