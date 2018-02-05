import { Text, ScrollView, Image, View } from 'react-native';
import React, { Component } from 'react';
import { Fonts, Metrics, Colors } from '../../Themes/';
import { StyleSheet } from 'react-native';
import ButtonOutline from '../../Components/ButtonOutline';
import ButtonWhiteFill from '../../Components/ButtonWhiteFill';

export default LaunchScreen = props => {

  return (
    <View style={[styles.section, styles.actions]}>
      <View style={styles.actionWrapper}>
        <Text style={styles.label}>Nie masz jeszcze konta?</Text>
        <ButtonWhiteFill onPress={() => {
          props.navigation.navigate('signUp');
        }}>
          ZAREJESTRUJ SIĘ
        </ButtonWhiteFill>
      </View>
      <View style={[styles.actionWrapper, styles.actionWrapperLast]}>
        <Text style={styles.label}>Masz już konto?</Text>
        <ButtonOutline onPress={() => {
          props.navigation.navigate('login');
          props.screenProps.toggleSlogan();
        }}>ZALOGUJ SIĘ</ButtonOutline>
      </View>
    </View>
  );
};

LaunchScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  section: {
    flex: 1,
  },
  label: {
    color: Colors.snow,
    marginBottom: 11,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.light,
  },
  actions: {
    justifyContent: 'flex-end',
    paddingBottom: 70,
  },
  actionWrapper: {
    alignItems: 'center',
  },
  actionWrapperLast: {
    marginTop: 34,
  },
});
