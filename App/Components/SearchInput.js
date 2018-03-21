import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import { Fonts, Colors } from '../Themes/';
import Icon from 'react-native-vector-icons/Octicons';

export default SearchInput = ({ onChange, value }) => {
  return (
    <View style={styles.row}>
      <View style={styles.iconContainer}>
        <Icon name={'search'} size={20} style={styles.loupe} />
      </View>
      <TextInput style={styles.input} onChangeText={onChange} value={value}/>
    </View>
  );
}

const styles ={
  input: {
    paddingVertical: 8,
    paddingRight: 8,
    flex: 1,
    fontSize: Fonts.size.medium,
  },
  row: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.strongGrey,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15
  },
  loupe: {
    borderColor: Colors.strongGrey,
    marginHorizontal: 10,
  },
  iconContainer: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: 'center',
    // backgroundColor: Colors.lightGrey,
    height: '100%'
  }
};
