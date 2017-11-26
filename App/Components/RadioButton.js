import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';
import {Colors} from '../Themes/';
import Reactotron from 'reactotron-react-native'

export default RadioButton = ({input, meta, boundValue, setValue}) => {
  const RADIUS_OUTER = 25;
  const RADIUS_INNER = 15;

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
  Reactotron.log("VALUE: " + boundValue);
  Reactotron.log("STORE VALUE: " + input.value);
  return (
    <TouchableOpacity style={styles.outline} onPress={setValue}>
      { boundValue === input.value && <View style={styles.fill}/> }
    </TouchableOpacity>
  );
}
