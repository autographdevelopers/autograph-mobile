import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import {SESSION_ACTION_TYPES} from '../../Redux/SessionRedux';
import ButtonOutline from '../../Components/ButtonOutline'

import {StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors} from '../../Themes/'

const styles=  StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: Metrics.marginHorizontal,
    paddingLeft: Metrics.marginHorizontal
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
    const {errorMessage, user} = this.props;
    const {email, password} = this.state;

    return (
      <View style={styles.container}>
        <View>
          <View>
            {errorMessage && <Text>{errorMessage}</Text>}
          </View>
          <Text>Email</Text>
          <TextInput value={email} onChangeText={this.setField('email')} autoCapitalize={'none'}
                     autoFocus={true} placeholder={'Please type in your email address.'} />
        </View>
        <View>
          <Text>Password</Text>
          <TextInput value={password} onChangeText={this.setField('password')} autoCapitalize={'none'}
                     autoFocus={true} placeholder={'Please type in your password.'} secureTextEntry={true}/>
        </View>
        <ButtonOutline>Log In</ButtonOutline>
        {/*<TouchableOpacity onPress={this.props.handleSubmit(email, password)}>*/}
          {/*<Text>Log In</Text>*/}
          {/*{user && <Text>{user.name}</Text>}*/}
        {/*</TouchableOpacity>*/}
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
