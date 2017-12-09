import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';

import { Fonts, Colors } from '../Themes/';
import InputFieldLayout from './InputFieldLayout';

/** This component was originally designed to work with redux-form library.
 It receives input and meta object props(check docs) from redux form Field wrapper and also other props you pass to Field component
 **/

export default InputField = ({ input, meta, label, required = false, placeholder, options = {} }) => {
  const errors = typeof(meta.error) === 'object' ? meta.error.all : [meta.error].filter(item => item);
  const errorsPresent = errors.length > 0;
  const styles = StyleSheet.create({

  });

  return (
    <InputFieldLayout meta={meta} required={required} label={label}>

    </InputFieldLayout>
  );
}
