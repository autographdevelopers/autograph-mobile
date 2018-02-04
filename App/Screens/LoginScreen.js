import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { login } from '../Redux/SessionRedux';
import { Field, reduxForm } from 'redux-form';
import { NavigationActions } from 'react-navigation';

import ButtonOutline from '../Components/ButtonOutline';
import LoginInputField from '../Components/LoginInputField';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Fonts, Colors } from '../Themes/index';
import FancyBackground from '../Components/FancyBackground';
import FormErrorMessage from '../Components/GenerealFormErrorMessage';
import Layout from '../Components/Layout';

const LoginScreen = props => {
  submitForm = () => {
    props.handleSubmit(login)();
  };

  const { change, error, navigation: { navigate }, submitting } = props;

  return (
    <FancyBackground>
      <Layout customStyles={{ backgroundColor: 'transparent' }}>
        <View style={styles.titleSection}>
          <Text style={styles.brandName}>AutoGraph</Text>
        </View>
        <View style={styles.inputsSection}>
          <FormErrorMessage>{error}</FormErrorMessage>
          <Field name={'email'}
                 component={LoginInputField}
                 handleTextChange={val => change('email', val)}
                 placeholder={'Type in your email address.'}
                 label={'EMAIL'}
                 icon={'md-mail'}
                 secure={false}
          />
          <Field name={'password'}
                 component={LoginInputField}
                 handleTextChange={val => change('password', val)}
                 placeholder={'Type in your email address.'}
                 label={'PASSWORD'}
                 icon={'md-lock'}
                 secure={true}
          />
        </View>
        <View style={styles.actionsSection}>
          <ButtonOutline onPress={this.submitForm} submitting={submitting}>
            ZALOGUJ SIE
          </ButtonOutline>
          <View style={styles.resetPasswordContainer}>
            <Icon name={'lock-reset'} size={20} color={Colors.snow}/>
            <TouchableOpacity onPress={() => navigate('resetPassword')}>
              <Text style={styles.resetPassword}>ZRESETUJ HASLO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Layout>
    </FancyBackground>
  );
};

export default reduxForm({
  form: 'login',
  initialValues: {
    email: 'w@gmail.com',
    password: 'aaaaaaaa',
  },
  onSubmitSuccess: (result, dispatch, props) => {
    const resetNav = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'startScreen' })],
    });

    props.navigation.dispatch(resetNav);
  },
})(LoginScreen);

const styles = StyleSheet.create({
  inputsSection: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  titleSection: {
    flex: 1,
    justifyContent: 'center',
  },
  actionsSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  brandName: {
    color: Colors.snow,
    fontSize: Fonts.size.big2,
    textAlign: 'center',
    fontWeight: '500',
  },
  slogan: {
    fontSize: Fonts.size.regular,
    textAlign: 'center',
    color: Colors.snow,
  },
  error: {
    textAlign: 'center',
    color: Colors.salmon,
    fontWeight: 'bold',
  },
  resetPassword: {
    textAlign: 'center',
    color: Colors.snow,
    fontSize: Fonts.size.small,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  resetPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 36,
  },
});
