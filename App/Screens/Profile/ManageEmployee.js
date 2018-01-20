import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import ButtonPrimary from '../../Components/ButtonPrimary';
import { Fonts, Colors } from '../../Themes/';
import { connect } from 'react-redux';
import { employeesActionCreators } from '../../Redux/EmployeesRedux';
import DefaultAvatar from '../../Components/DefaultAvatar';
import Layout from '../../Components/Layout';
import { FETCHING_STATUS } from '../../Lib/utils';
import ProfileLabel from '../../Components/ProfileLabel';
import NavHeader from '../../Components/NavHeader';
import ListHeader from '../../Components/ListHeader';

export default class ManageEmployee extends Component {
  // static navigationOptions = ({ navigation }) => {
  //   // console.log('navigation in header');
  //   // console.log(navigation);
  //
  //   return {
  //     header: <NavHeader navigation={navigation}
  //                        title={`Zarzadzaj pracownikiem`}/>,
  //   };
  // };

  render() {
    const { navigation } = this.props;
    const { user, index } = navigation.state.params;
    console.log('props on screen');
    console.log(this.props);

    return (
      <ScrollView>
        <ListHeader title={'Uprawnienia'}/>
        <Layout>
        </Layout>
      </ScrollView>
    );
  }
}

// TODO ask Maciek why
