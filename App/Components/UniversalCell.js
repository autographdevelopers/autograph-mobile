import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/';
import Icon from 'react-native-vector-icons/FontAwesome';
import Avatar from './Avatar';

export default UniversalCell = ({ title, subtitle, avatar, CustomTitle, CustomRightBtn = undefined, separator = 'full', topLine = false }) => {
  const DEFAULT_HEIGHT = 43,
    LARGER_HEIGHT = 60;

  const styles = StyleSheet.create({
    container: {
      height: !!!subtitle && !!!avatar ? DEFAULT_HEIGHT : LARGER_HEIGHT,
      width: '100%',
    },
    body: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 5,
      borderColor: Colors.mediumGrey,
      borderBottomWidth: separator === 'padded' ? 1 : 0,
      borderTopWidth: separator === 'padded' && topLine ? 1 : 0
    },
    textContainer: {
      flex: 1
    },
    rightBtnWrapper: {
      paddingLeft: 15
    },
    title: {
      color: Colors.black,
      fontSize: Fonts.size.medium,
      marginBottom: subtitle ? 3 : 0
    },
    subtitle: {
      color: Colors.strongGrey,
      fontSize: Fonts.size.small
    }
  });

  return <TouchableOpacity style={styles.container}>
    <View style={styles.body}>
      { avatar && <Avatar src={avatar}/> }
      <View style={styles.textContainer}>
        {CustomTitle ? <CustomTitle/> : <Text style={styles.title}>{title}</Text> }
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      <View style={styles.rightBtnWrapper}>
        {CustomRightBtn !== null && CustomRightBtn !== undefined && <CustomRightBtn/>}
        {CustomRightBtn === undefined && <Icon name={'angle-right'} size={25} color={Colors.strongGrey}/>}
      </View>
    </View>
  </TouchableOpacity>
}
