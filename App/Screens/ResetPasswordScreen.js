import { Text, View, StyleSheet, Alert } from 'react-native';
import React, { Component } from 'react';
import NavHeader from '../Components/NavHeader';
import InputField from '../Components/InputField';
import PrimaryButton from '../Components/ButtonPrimary';
import Layout from '../Components/Layout';
import { Fonts, Colors } from '../Themes/index';
import { connect } from 'react-redux';
import { resetPasswordTypes } from '../Redux/ResetPasswordRedux';
import { STATUS } from '../Redux/ResetPasswordRedux'


class ResetPasswordScreen extends Component {
  static navigationOptions = {
    header: (props) => <NavHeader navigation={props.navigation} title={'Odzyskaj haslo'} />
  };

  constructor(props) {
    super(props)

    this.state = { email: '' }
  }

  handleEmailChange = email => {
    this.props.resetPasswordResetState();
    this.setState({ email });
  }

  componentWillReceiveProps(nextProps) {
    const { status } = nextProps.resetPassword

    if (status === STATUS.SUCCESS) {
      const title = 'Sukces!';
      const message = 'Email z linkiem do zresetowania Twojego hasła został wysłany.';
      const buttons = [
        {
          text: 'OK', onPress: () => {
          this.props.resetPasswordResetState();
          this.props.navigation.goBack();
        }
        },
      ];
      const options = { cancelable: false };

      Alert.alert(title, message, buttons, options);
    }
  }

  componentWillUnmount() {
    this.props.resetPasswordResetState();
  }

  render () {
    const { email } = this.state
    const { error } = this.props.resetPassword
    const { handleSubmit } = this.props

    return (
      <Layout>
        <Text style={styles.instructionText}>
          Wpisz adres email użyty podczas rejestracji, aby otrzymać link do odzyskania hasła.
        </Text>
        <InputField input={{ onChange: this.handleEmailChange, onBlur: () => {} }}
                    meta={{ error: error, touched: error }} options={{autoCapitalize: 'none'}}
                    label={'Email'}
                    required={true}
        />
        <View style={styles.buttonWrapper}>
          <PrimaryButton onPress={ handleSubmit(email) }>Odzyskaj hasło</PrimaryButton>
        </View>
      </Layout>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  handleSubmit: (email) => {
    return () => {
      dispatch({ type: resetPasswordTypes.RESET_PASSWORD_REQUEST, payload: { email } })
    };
  },
  resetPasswordResetState: () => {
    dispatch({ type: resetPasswordTypes.RESET_PASSWORD_RESET_STATE })
  }
})

const mapStateToProps = state => {
  return { resetPassword: state.resetPassword }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordScreen)

const styles = StyleSheet.create({
  instructionText: {
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.strongGrey,
    fontSize: Fonts.regular
  },
  buttonWrapper: {
    marginTop: 15
  }
});
