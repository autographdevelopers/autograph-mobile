import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Fonts, Colors } from '../Themes/';
import _ from 'lodash';

export default StepsIndicators = ({ stepsNo, activeIndex, customContainerStyles={}, onPress=(index) => ()=>{} }) => {
  const BULLET_RADIUS = 15;

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
      backgroundColor: Colors.subtleGray,
      justifyContent: 'center',
      alignItems: 'center'
    },
    bulletActive: {
      backgroundColor: Colors.primaryWarm,
    },
    number: {
      backgroundColor: 'transparent',
      textAlign: 'center',
      fontSize: Fonts.size.small,
      color: Colors.strongGrey,
    },
    numberActive: {
      fontWeight: 'bold',
      color: Colors.primaryWarm
    },
    labelActive: {
      color: Colors.primaryWarm
    },
    lineContainer: {
      flex: 1,
      justifyContent: 'center'
    },
    line: {
      height: 1,
      backgroundColor: Colors.subtleGray
    },
    lineHidden: {
      height: 0
    },
    lineActive: {
      backgroundColor: Colors.primaryWarm
    }
  });

  const LeftLine = ({ index }) => (
    <View style={styles.lineContainer}>
      <View style={[styles.line, index <= activeIndex && styles.lineActive, index === 0 && styles.lineHidden]}/>
    </View>
  );

  const RightLine = ({ index }) => (
    <View style={styles.lineContainer}>
      <View
        style={[styles.line, index < activeIndex && styles.lineActive, index === (stepsNo - 1) && styles.lineHidden]}/>
    </View>
  );

  const Bullet = ({ index }) => (
    <View style={[styles.bullet, index <= activeIndex && styles.bulletActive]}/>
  );

  const BoxTop = ({ children }) => (
    <View style={styles.upperContainer}>
      {children}
    </View>
  );

  const Box = ({children}) => (
    <View style={styles.box}>
      {children}
    </View>
  );

  const renderIndicators = () => (
    _.times(stepsNo, index => (
      <Box key={`box-${index}`}>
        <BoxTop style={styles.upperContainer}>
          <LeftLine index={index}/>
          <TouchableOpacity onPress={onPress(index)}>
            <Bullet index={index}/>
          </TouchableOpacity>
          <RightLine index={index}/>
        </BoxTop>
      </Box>
    ))
  );

  return (
    <View style={[styles.container, customContainerStyles]}>
      {renderIndicators()}
    </View>
  );
}
