import { Text, ScrollView, Image } from 'react-native';
import React, { Component } from 'react';
import FancyBackground from '../Components/fancy_background';

export default class LaunchScreen extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <FancyBackground/>
    )
  }
}
