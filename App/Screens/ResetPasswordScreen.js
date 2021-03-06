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
import I18n from '../I18n';

class ResetPasswordScreen extends Component {
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
    const { t } = this.props.I18n;
    if (status === STATUS.SUCCESS) {
      const title = t('success') + '!';
      const message = t('password_reset_request_feedback');
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
      <View style={{justifyContent: 'space-between', flex: 1}}>
        <Text style={styles.instructionText}>
          {I18n.t('reset_password_instruction')}
        </Text>
        <InputField input={{ onChange: this.handleEmailChange, onBlur: () => {} }}
                    meta={{ error: error, touched: error }} options={{autoCapitalize: 'none'}}
                    label={I18n.t('email')}
                    required={true}
        />
        <View style={styles.buttonWrapper}>
          <PrimaryButton onPress={ handleSubmit(email) }>{I18n.t('recover_password')}</PrimaryButton>
        </View>
      </View>
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
    marginVertical: 15
  }
});
