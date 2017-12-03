import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/';

export default StepsIndicators = ({ labels, activeIndex }) => {
  const BULLET_RADIUS = 25;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignSelf: 'center',
      marginBottom: 25
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
      alignItems: 'center'
    },
    bulletActive: {
      borderColor: Colors.primaryWarm
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
      backgroundColor: Colors.strongGrey
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
        style={[styles.line, index < activeIndex && styles.lineActive, index === (labels.length - 1) && styles.lineHidden]}/>
    </View>
  );

  const Bullet = ({ index }) => (
    <View style={[styles.bullet, index <= activeIndex && styles.bulletActive]}>
      <Text style={[styles.number, index <= activeIndex && styles.numberActive]}>{index + 1}</Text>
    </View>
  );

  const BoxTop = ({ children }) => (
    <View style={styles.upperContainer}>
      {children}
    </View>
  );

  const BoxBottom = ({ label, index }) => (
    <Text style={[styles.bottomContainer, index <= activeIndex && styles.labelActive]}>
      {label}
    </Text>
  );

  const Box = ({children}) => (
    <View style={styles.box}>
      {children}
    </View>
  );

  const renderIndicators = () => (
    labels.map((label, index) => (
      <Box key={`box-${index}`}>
        <BoxTop style={styles.upperContainer}>
          <LeftLine index={index}/>
          <Bullet index={index}/>
          <RightLine index={index}/>
        </BoxTop>
        <BoxBottom label={label} index={index}/>
      </Box>
    ))
  );

  return (
    <View style={styles.container}>
      {renderIndicators()}
    </View>
  );
}
