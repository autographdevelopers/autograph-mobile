import { Text, View, StyleSheet, Alert } from 'react-native';
import React, { Component } from 'react';
import NavHeader from '../Components/NavHeader';
import InputField from '../Components/InputField';
import PrimaryButton from '../Components/ButtonPrimary';
import Layout from '../Components/Layout';
import { Fonts, Colors } from '../Themes/index';
import { connect } from 'react-redux';
import { resetPasswordTypes } from '../Redux/ResetPasswordRedux';

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
})

class ResetPasswordScreen extends Component {
  static navigationOptions = {
    header: (props) => <NavHeader navigation={props.navigation} title={'Odzyskaj haslo'} />
  };

  constructor(props) {
    super(props)

    this.state = { email: '' }
  }

  setField(field) {
    return text => {
      this.props.resetPasswordResetState();
      this.setState({ [field]: text });
    }
  }

  componentWillUnmount() {
    this.props.resetPasswordResetState();
  }


  renderSuccesAlert () {
    const { emailSent } = this.props.resetPassword

    if (emailSent) {
      Alert.alert(
        'Sukces',
        'Email z linkiem do zresetowania Twojego hasła został wysłany.',
        [
          {
            text: 'OK', onPress: () => {
              this.props.resetPasswordResetState();
              this.props.navigation.goBack();
            }
          },
        ],
        { cancelable: false }
      )
    }
  }

  render () {
    this.renderSuccesAlert();
    const email = this.state.email
    const error = this.props.resetPassword.error
    const handleSubmit = this.props.handleSubmit

    return (
      <Layout>
        <Text style={styles.instructionText}>
          Wpisz adres email użyty podczas rejestracji, aby otrzymać link do odzyskania hasła.
        </Text>
        <InputField input={{ onChange: this.setField('email'), onBlur: () => {} }}
                    meta={{ error: error, touched: error }}
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
