import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ButtonText from './ButtonText';
import { NavigationActions } from 'react-navigation';
import { sessionActionCreators } from '../Redux/Access/SessionRedux';
import { modalActionCreators } from '../Redux/Views/Modals/ModalRedux';
import { Fonts, Colors } from '../Themes';
import I18n from '../I18n';

const UnauthorizedAction = ({ navigation, destroySession, hideModal }) => {
  const triggerLogout = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [ NavigationActions.navigate({ routeName: 'loginLaunch' }) ],
    });

    hideModal();
    navigation.dispatch(resetAction);
    destroySession();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{I18n.t('unauthorized')}</Text>
      <Text style={styles.description}>
        {I18n.t('unauthorized_alert_message')}
      </Text>
      <ButtonText onPress={triggerLogout} customTextStyle={styles.btn}>
        {I18n.t('login_again')}
      </ButtonText>
    </View>
  )
};

const mapDispatchToProps = dispatch => ({
  destroySession: () => dispatch(sessionActionCreators.destroyRequest()),
  hideModal: () => dispatch(modalActionCreators.close())
});

const styles = {
  container: {
    alignItems: 'center',
    padding: 15
  },
  description: {
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 30,
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.medium
  },
  title: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium
  },
  btn: {
    fontFamily: Fonts.type.medium
  }
};

export const UnauthorizedActionWidget = connect(null, mapDispatchToProps)(UnauthorizedAction);
