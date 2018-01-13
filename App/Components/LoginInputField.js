import React, {Component} from 'react';
import {Text, TouchableOpacity, View, TextInput} from 'react-native';
import {StyleSheet} from 'react-native';
import {Fonts, Colors, Metrics} from '../Themes/';
import Icon from 'react-native-vector-icons/Ionicons';

export default LoginInputField = ({label, icon, value, handleTextChange, placeholder, secure}) => {
  const styles = StyleSheet.create({
    container: {
      marginTop: Metrics.doubleBaseMargin,
      backgroundColor: Colors.transparent,
      height: 74,
    },
    label: {
      color: Colors.snow,
      backgroundColor: Colors.transparent,
      fontSize: Fonts.size.small,
      fontWeight: 'bold',
      marginBottom: 11,
    },
    input: {
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
      color: Colors.softBlack,
      fontSize: Fonts.size.medium,
      backgroundColor: Colors.snow,
      flex: 1,
    },
    iconBox: {
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      paddingHorizontal: 15,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.snow,
    },
    inputRow: {
      flexDirection: 'row',
      height: 50
    },
  });

  return (
    <View style={styles.container}>
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
  );
};
