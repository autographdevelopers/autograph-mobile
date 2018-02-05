import { Text, ScrollView, Image, View } from 'react-native';
import React, { Component } from 'react';
import { Fonts, Metrics, Colors } from '../../Themes/';
import { StyleSheet } from 'react-native';
import ButtonOutline from '../../Components/ButtonOutline';
import ButtonWhiteFill from '../../Components/ButtonWhiteFill';

export default LaunchScreen = ({navigation, screenProps}) => {

  return (
    <View style={[styles.section, styles.actions]}>
      <View style={styles.actionWrapper}>
        <Text style={styles.label}>
          {screenProps.I18n.t('not_have_account')}
        </Text>
        <ButtonWhiteFill onPress={() => {
          navigation.navigate('signUp');
        }}>
          {screenProps.I18n.t('register')}
        </ButtonWhiteFill>
      </View>
      <View style={[styles.actionWrapper, styles.actionWrapperLast]}>
        <Text style={styles.label}>{screenProps.I18n.t('have_account')}</Text>
        <ButtonOutline onPress={() => {
          navigation.navigate('login');
          screenProps.toggleSlogan();
        }}>
          {screenProps.I18n.t('login')}
        </ButtonOutline>
      </View>
    </View>
  );
};

LaunchScreen.navigationOptions = {
  headerStyle: {
    backgroundColor: 'transparent',
    paddingTop: 0,
  },
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
