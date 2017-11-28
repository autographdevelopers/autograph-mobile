import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';
import {Colors} from '../Themes/';

export default RadioButton = ({value, boundValue, setValue}) => {
  const RADIUS_OUTER = 20;
  const RADIUS_INNER = 10;

  const styles = StyleSheet.create({
    outline: {
      width: RADIUS_OUTER,
      height: RADIUS_OUTER,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: Colors.primaryWarm,
      justifyContent: 'center',
      alignItems: 'center'
    },
    fill: {
      width: RADIUS_INNER,
      height: RADIUS_INNER,
      borderRadius: 50,
      backgroundColor: Colors.primaryWarm
    }
  });

  return (
    <TouchableOpacity style={styles.outline} onPress={setValue}>
      { boundValue === value && <View style={styles.fill}/> }
    </TouchableOpacity>
  );
}
