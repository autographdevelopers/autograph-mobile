import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/';

export default StepsIndicators = ({ labels, current }) => {
  const BULLET_RADIUS = 20;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignSelf: 'center',
      },
    box: {
      flex: 1,
      flexDirection: 'column'
    },
    bottomContainer: {
      textAlign: 'center',
      padding: 5,
      fontSize: Fonts.size.small,
      color: Colors.strongGrey
    },
    upperContainer: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
    bullet: {
      width: BULLET_RADIUS,
      height: BULLET_RADIUS,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: Colors.strongGrey,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bulletActive: {
      borderColor: Colors.primaryWarm
    },
    number: {
      backgroundColor: 'transparent',
      textAlign: 'center',
      fontSize: Fonts.size.small,
      color: Colors.strongGrey
    },
    textActive: {
      color: Colors.primaryWarm
    },
    lineContainer: {
      flex: 1,
      justifyContent: 'center'
    },
    line: {
      height: 2,
      backgroundColor: Colors.strongGrey
    },
    lineHidden: {
      height: 0
    },
    lineActive: {
      backgroundColor: Colors.primaryWarm
    }
  });

  const renderIndicators = () => (
    labels.map((label, index) => (
      <View style={styles.box} key={`box-${index}`}>
        <View style={styles.upperContainer}>
          <View style={styles.lineContainer}>
            <View style={[styles.line, index <= current && styles.lineActive, index === 0 && styles.lineHidden]}/>
          </View>
          <View style={[styles.bullet, index <= current && styles.bulletActive]}>
            <Text style={[styles.number, index <= current && styles.textActive]}>{index + 1}</Text>
          </View>
          <View style={styles.lineContainer}>
            <View style={[styles.line, index < current && styles.lineActive, index === (labels.length-1) && styles.lineHidden]}/>
          </View>
        </View>
        <Text style={[styles.bottomContainer, index <= current && styles.textActive]}>{label}</Text>
      </View>
    ))
  );

  return (
    <View style={styles.container}>
      {renderIndicators()}
    </View>
  );
}
