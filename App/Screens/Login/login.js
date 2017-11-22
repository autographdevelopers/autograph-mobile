import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { SESSION_ACTION_TYPES } from '../../Redux/SessionRedux'
import ButtonOutline from '../../Components/ButtonOutline'
import LoginInputField from '../../Components/LoginInputField'
import Icon from 'react-native-vector-icons/MaterialIcons';

import { StyleSheet } from 'react-native'
import { Fonts, Metrics, Colors } from '../../Themes/'

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingHorizontal: Metrics.marginHorizontal,
    flex: 1,
    // alignItems: 'center'

  },
  inputsWrapper: {
    // borderWidth: .5,
    justifyContent: 'flex-start',
    flex: 2
  },
  titleWrapper: {
    flex: 2,
    justifyContent: 'center',
    // borderWidth: .5
  },
  btnWrapper: {
    flex: 1,
    paddingVertical: 20,
    justifyContent: 'center',
    // borderWidth: .5

  },
  brandName: {
    color: Colors.snow,
    fontSize: Fonts.size.big,
    textAlign: 'center',
    fontWeight: '500'
  },
  slogan: {
    fontSize: Fonts.size.regular,
    textAlign: 'center',
    color: Colors.snow
  },
  inputsGroup: {
    // textAlign: 'center'
  },
  error: {
    textAlign: 'center',
    color: Colors.salmon
  },
  resetPassword: {
    textAlign: 'center',
    color: Colors.snow,
    marginTop: 20

  }
})

class LoginScreen extends Component {

  constructor (props) {
    super(props)
    this.state = {email: '', password: ''}
  }

  setField (field) {
    return text => {
      let changedField = {}
      changedField[field] = text
      this.setState(changedField)
    }
  }

  render () {
    const {errorMessage, handleSubmit, navigation: {navigate}} = this.props
    const {email, password} = this.state

    return (
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.brandName}>AutoGraph</Text>
          {/*<Text style={styles.slogan}>Profejonalne narzedzie do zarzadzania szkola jazdy.</Text>*/}
        </View>
        <View style={styles.inputsWrapper}>
          <View>
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
          </View>
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
        </View>
        <View style={styles.btnWrapper}>
          <ButtonOutline onPress={handleSubmit(email, password)}>ZALOGUJ SIE</ButtonOutline>
          <Icon size={15} icon={'lock-reset'} color={Colors.snow} />
          {/*<TouchableOpacity onPress={() => navigate('resetPassword')}><Text style={styles.resetPassword}>ZRESETUJ HASLO</Text></TouchableOpacity>*/}
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
