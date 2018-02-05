import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { login } from '../../Redux/SessionRedux';
import { Field, reduxForm } from 'redux-form';
import { NavigationActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ButtonOutline from '../../Components/ButtonOutline';
import LoginInputField from '../../Components/LoginInputField';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Fonts, Colors } from '../../Themes/index';
import FormErrorMessage from '../../Components/GenerealFormErrorMessage';

class LoginScreen extends Component {
  static navigationOptions = {
    headerTintColor: Colors.snow,
    headerStyle: {
      position: 'absolute',
      backgroundColor: 'transparent',
      zIndex: 9999999999,
      top: 0,
      left: 0,
      right: 0,
    },
  };

  submitForm = () => {
    this.props.handleSubmit(login)();
  };

  componentWillUnmount() {
    this.props.screenProps.toggleSlogan();
  }

  render() {
    const { change, error, navigation: { navigate }, submitting } = this.props;

    return (
      <KeyboardAwareScrollView contentContainerStyle={[styles.section]}>
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
      </KeyboardAwareScrollView>
    );
  }
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
      key: null,
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
  actionsSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
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
  section: {
    marginTop: 30,
    flex: 1,
  },
});
