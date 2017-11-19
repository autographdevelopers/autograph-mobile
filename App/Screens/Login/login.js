import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import {SESSION_ACTION_TYPES} from '../../Redux/SessionRedux';
import ButtonOutline from '../../Components/ButtonOutline'
import LoginInputField from '../../Components/LoginInputField'

import {StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors} from '../../Themes/'

const styles=  StyleSheet.create({
  container: {
    // flex: 1,
    // paddingHorizontal: Metrics.marginHorizontal,
    flex: 1,

  },
  inputsGroup: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  }
})



class LoginScreen extends Component {

  constructor (props) {
    super(props)
    this.state = {email: '', password: ''}
  }

  setField(field) {
    return text => {
      let changedField = {}
      changedField[field] = text;
      this.setState(changedField);
    }
  }

  render () {
    const {errorMessage, handleSubmit} = this.props;
    const {email, password} = this.state;

    return (
      <View style={styles.container}>
        <View>
          <View>
            {errorMessage && <Text>{errorMessage}</Text>}
          </View>
          <View style={styles.inputsGroup}>
            <LoginInputField value={email}
                             handleTextChange={this.setField('email')}
                             placeholder={'Please type in your email address.'}
                             label={'EMAIL'}
                             icon={'envelope'}
                             secure={false}
            />
            <LoginInputField value={password}
                             handleTextChange={this.setField('password')}
                             placeholder={'Please type in your password.'}
                             label={'PASSWORD'}
                             icon={'md-lock'}
                             secure={true}
            />
            <ButtonOutline onPress={handleSubmit(email, password)}>Log In</ButtonOutline>
          </View>
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  handleSubmit: (email, password) => {
    return () => { dispatch({type: SESSION_ACTION_TYPES.REQUEST_LOGIN_PROCEDURE, payload: {email, password}}) }
  }
})

const mapStateToProps = (state, _) => {
  return {
    errorMessage: state.session.errorMessage,
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
