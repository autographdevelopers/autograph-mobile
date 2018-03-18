import React, { Component } from 'react';
import {
  Alert,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import ButtonPrimary from '../../../Components/ButtonPrimary';
import { Colors, Fonts } from '../../../Themes/index';
import { connect } from 'react-redux';
import Layout from '../../../Components/Layout';
import ListHeader from '../../../Components/ListHeader';
import { Field, reduxForm } from 'redux-form';
import CellSwitch from '../../../Components/CellWithSwitch';


export default class ManageStudent extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Archiwizuj</Text>
      </View>
    );
  }
}
