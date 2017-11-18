import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics } from '../Themes/';

import IconE from 'react-native-vector-icons/FontAwesome';
import IconP from 'react-native-vector-icons/Ionicons';


export default LoginInputField = ({label, icon, value, handleTextChange, placeholder, secure}) => {

  const styles = StyleSheet.create({
    container: {
      marginTop: Metrics.doubleBaseMargin,
      // flex: 1,
      alignItems:'center',
      backgroundColor: Colors.transparent
    },
    grouper: {
      // flex: 1,
      width: '85%',
      height: 'auto'
    },
    label: {
      color: Colors.snow,
      backgroundColor: Colors.transparent,
      fontSize: Fonts.size.small,
      fontWeight: 'bold',
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
            {
              secure ? <IconP name={icon} size={24} color={Colors.strongGrey}/>
                : <IconE name={icon} size={24} color={Colors.strongGrey}/>
            }
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
