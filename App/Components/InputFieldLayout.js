import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/';
import InputLabel from './InputLabel';

/** This component was originally designed to work with redux-form library.
 It receives input and meta object props(check docs) from redux form Field wrapper and also other props you pass to Field component
 **/

export default InputFieldLayout = ({ children, label, required, meta, line = true, customErrorStyles = {} }) => {
  const errors = typeof(meta.error) === 'object' ? meta.error.all : [meta.error].filter(item => item);
  const errorsPresent = errors.length > 0;
  const renderErrors = () => {
    return errors.map((error, index) => { return <Text style={styles.errorZone} key={`error-${index}`}>{error}</Text> });
  };

  const styles = StyleSheet.create({
    errorZone: {
      color: Colors.salmon,
      fontSize: Fonts.size.small,
      marginTop: 5,
      ...customErrorStyles
    },
    container: {
      marginBottom: 15,
      // flexGrow: 1, // test if doesnt brak anything
       // flex:1// test if doesnt brak anything
    },
    childrenWrapper: {
      paddingVertical: 10,
      borderBottomWidth: line ? 1 : 0,
      borderBottomColor:  errorsPresent && meta.touched ? Colors.salmon : Colors.mediumGrey
    },
    input: {
      fontSize: Fonts.size.medium,
      color: Colors.black
    }
  });
  return (
    <View style={styles.container}>
      <InputLabel required={required} label={label}/>
      <View style={styles.childrenWrapper}>
        <TextInput value={'dsadsa'}
                   style={styles.input}
                   onChangeText={()=>{}}
        />
      </View>
      {errorsPresent && meta.touched && renderErrors()}
    </View>
  );
}
