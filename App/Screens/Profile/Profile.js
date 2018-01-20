import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Animated,
} from 'react-native';
import { connect } from 'react-redux';
import { employeesActionCreators } from '../../Redux/EmployeesRedux';
import Layout from '../../Components/Layout';
import { FETCHING_STATUS } from '../../Lib/utils';

export default class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount = () => {
    this.props.screenProps.setCurrentEmployee(null);
  };

  render() {
    return (
      <Layout/>
    );
  }
}
