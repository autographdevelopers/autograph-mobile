import { Text, View } from 'react-native';
import React, { Component } from 'react';
import NavHeader from '../Components/nav_header';

export default class ResetPasswordScreen extends Component {

  static navigationOptions = {
    header: (props) => <NavHeader navigation={props.navigation} title={'Odzyskaj haslo'} />
  };

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View/>
    )
  }
}
