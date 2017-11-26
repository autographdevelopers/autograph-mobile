import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { SESSION_ACTION_TYPES } from '../Redux/SessionRedux';
import ButtonOutline from '../Components/ButtonOutline';
import LoginInputField from '../Components/LoginInputField';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/index';

const styles = StyleSheet.create({
  inputsSection: {
    justifyContent: 'flex-end',
    flex: 1
  },
  titleSection: {
    flex: 1,
    justifyContent: 'center'

  },
  actionsSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
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
  error: {
    textAlign: 'center',
    color: Colors.salmon,
    fontWeight: 'bold'

  },
  resetPassword: {
    textAlign: 'center',
    color: Colors.snow,
    fontSize: Fonts.size.small,
    fontWeight: 'bold',
    marginLeft: 8
  },
  resetPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 36
  }
});

class LoginScreen extends Component {
  static navigationOptions = {
    headerTintColor: Colors.snow,
    headerStyle: {
      position: 'absolute',
      backgroundColor: 'transparent',
      zIndex: 99999,
      top: 0,
      left: 0,
      right: 0
    }
  };

  constructor(props) {
    super(props);
    this.state = { email: '', password: '' }
  }

  setField(field) {
    return text => {
      let changedField = {};
      changedField[field] = text;
      this.setState(changedField);
    }
  }

  render() {
    const { errorMessage, handleSubmit, navigation: { navigate } } = this.props;
    const { email, password } = this.state;

    return (
      <FancyBackground>
        <View style={styles.titleSection}>
          <Text style={styles.brandName}>AutoGraph</Text>
        </View>

        <View style={styles.inputsSection}>
          <View>
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
          </View>
          <LoginInputField value={email}
                           handleTextChange={this.setField('email')}
                           placeholder={'Type in your email address.'}
                           label={'EMAIL'}
                           icon={'md-mail'}
                           secure={false}
          />
          <LoginInputField value={password}
                           handleTextChange={this.setField('password')}
                           placeholder={'Type in your password.'}
                           label={'PASSWORD'}
                           icon={'md-lock'}
                           secure={true}
          />
        </View>

        <View style={styles.actionsSection}>
          <ButtonOutline onPress={handleSubmit(email, password)}>ZALOGUJ SIE</ButtonOutline>
          <View style={styles.resetPasswordContainer}>
            <Icon name={'lock-reset'} size={20} color={Colors.snow}/>
            <TouchableOpacity onPress={() => navigate('resetPassword')}>
              <Text style={styles.resetPassword}>ZRESETUJ HASLO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </FancyBackground>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  handleSubmit: (email, password) => {
    return () => {
      dispatch({ type: SESSION_ACTION_TYPES.REQUEST_LOGIN_PROCEDURE, payload: { email, password } })
    };
  }
});

const mapStateToProps = (state, _) => {
  return {
    errorMessage: state.session.errorMessage,
    user: state.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)

