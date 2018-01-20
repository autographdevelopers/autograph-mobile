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
import { List, ListItem } from 'react-native-elements';
import ButtonPrimary from '../../Components/ButtonPrimary';
import { Fonts, Colors } from '../../Themes/';
import { connect } from 'react-redux';
import { employeesActionCreators } from '../../Redux/EmployeesRedux';
import DefaultAvatar from '../../Components/DefaultAvatar';
import Layout from '../../Components/Layout';
import { FETCHING_STATUS } from '../../Lib/utils';
import ProfileHeader from '../../Components/ProfileHeader';
import NavHeader from '../../Components/NavHeader';

export default class Profile extends Component {
  // static navigationOptions = {
  //   header: props => <NavHeader navigation={props.navigation} title={`Profile`}/>,
  //   headerStyle: { elevation: 0, shadowOpacity: 0 }
  // };

  constructor(props) {
    super(props);
  }

  render() {
    const { user, index } = this.props.screenProps;
    console.log('props on screen');
    console.log(this.props);
    return (
      <View style={{ flex: 1 }}>
        {/*<Animated.View style={{ height: this.variableHeight }}>*/}

        {/*</Animated.View>*/}
      </View>
    );
  }
}
