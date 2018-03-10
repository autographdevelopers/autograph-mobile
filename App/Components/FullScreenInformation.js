import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/index';
import I18n from '../I18n/index';

export default FullScreenInformation = ({ children }) => {
  const styles = {
    container: {
      margin: 15,
      borderRadius: 10,
      backgroundColor: Colors.subtleGray,
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: 15
    },
    text: {
      color: Colors.strongGrey,
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontWeight: 'bold', marginBottom: 5 }]}>
        {children}
      </Text>
      <Text style={styles.text}>
        {I18n.t('lacksPrivileges.generic')}
      </Text>
    </View>
  );
};
