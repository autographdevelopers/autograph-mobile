import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/';
import Icon from 'react-native-vector-icons/Feather';

export default FilterButton = ({ onPress, children}) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Icon name="filter" size={20} color={Colors.primaryWarm} />
        <Text style={styles.title}>filtruj</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 50,
    shadowColor: Colors.black,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 1,
    backgroundColor: Colors.snow,
    shadowOffset: { width: 0, height: 2 }
  },
  title: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.base,
    color: Colors.primaryWarm,
    fontWeight: '400',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginRight: 5,
    marginLeft: 5,
    borderLeftWidth: 1,
    borderLeftColor: Colors.primaryWarm,
  },
  wrapper: {
    position: 'absolute',
    zIndex: 9999999,
    backgroundColor: 'transparent',
    bottom: 20,
    right: 20,
  }
});
