import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';
import {Colors} from '../Themes/';
import Icon from 'react-native-vector-icons/Entypo';

export default CheckBox = ({input, setValue}) => {
  const SIZE = 16;

  const styles = StyleSheet.create({
    container: {
      borderRadius: 5,
      backgroundColor: input.value ? Colors.primaryWarm : Colors.mediumGrey,
      width: SIZE,
      height: SIZE
    },
    button: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent'
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={setValue(!input.value)}>
        {input.value && <Icon name={'check'} color={Colors.snow} size={12}/>}
      </TouchableOpacity>
    </View>
  );
};
