import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Fonts, Colors } from '../Themes/'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonText from './ButtonText';

export default AccountHeader = ({ navigation, title }) => {
  const styles = StyleSheet.create({
    mainContainer: {
      margin: 15,
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row'
    },
    welcomeFeed: {
      marginLeft: 15,
    },
    welcomeText: {
      fontSize: Fonts.size.regular,
      color: Colors.strongGrey,
      fontWeight: '400'
    }
  });

  return (
    <View style={styles.mainContainer}>
      <Avatar
        large
        rounded
        source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
      />
      <View style={styles.welcomeFeed}>
        <Text style={styles.welcomeText}>Cześć,</Text>
        <Text style={styles.welcomeText}>Maciej Michalik</Text>
        <ButtonText
          position={'flex-start'}
          onPress={() => {}}
          customTextStyle={{fontSize: 13}}
          customStyle={{marginTop: 7}}
          icon={<Icon name={'settings'} size={16} color={Colors.primaryWarm}/>}>
          Ustawienia i informacje
        </ButtonText>
      </View>
    </View>
  );
}
