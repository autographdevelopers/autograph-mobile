import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Fonts, Colors } from '../Themes/';

export default InfoBox = ({title, description}) => {
  return(
    <View style={styles.helperContainer}>
      { title &&
      <Text style={[styles.helperText, { fontWeight: 'bold', marginBottom: 5 }]}>
        {title}
      </Text>
      }
      { description &&
        <Text style={styles.helperText}>
          {description}
        </Text>
      }
    </View>
  );
}
const styles = {
  helperContainer: {
    backgroundColor: Colors.lightGrey,
    marginVertical: 15,
    borderRadius: 10,
    padding: 15,
    justifyContent: 'center',
  },
  helperText: {
    color: Colors.strongGrey,
    textAlign: 'center',
  },
};



