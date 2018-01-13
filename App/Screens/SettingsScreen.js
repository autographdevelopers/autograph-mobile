import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Layout from '../Components/Layout'
import IconF from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../Themes';

export default class SettingsScreen extends Component {
  static navigationOptions = { header: null };

  saveSuccessCallback = () => {
    const title = 'Congratulations!';
    const message = 'Your changes have been saved.';
    const buttons = [{
      text: 'OK', onPress: () => {
        this.props.navigation.goBack(null);
      }
    }];

    Alert.alert(title, message, buttons);
  };

  render() {
    const { navigation } = this.props;
    const navParams = { handleSubmitSuccess: this.saveSuccessCallback, singleton: true };

    return (
      <Layout>
        <ListItem
          // leftIcon={<IconF size={30} name={'cog'} color={Colors.strongGrey}/>}
          title={'Information'}
          subtitle={'Edit basic information about your school.'}
          containerStyle={{ borderBottomWidth: 0 }}
          keyExtractor={(item, index) => index}
          onPress={() => {
            navigation.navigate('editSchoolInfo', navParams)
          }}
        />

        <ListItem
          title={'Schedule Bounadries'}
          subtitle={'Edit schedule boundaries'}
          containerStyle={{ borderBottomWidth: 0 }}
          keyExtractor={(item, index) => index}
          onPress={() => {
            navigation.navigate('editScheduleBoundaries', navParams)
          }}
        />

        <ListItem
          title={`Calendar`}
          subtitle={'Edit calendar settings'}
          containerStyle={{ borderBottomWidth: 0 }}
          keyExtractor={(item, index) => index}
          onPress={() => {
            navigation.navigate('editScheduleSettings', navParams)
          }}
        />
      </Layout>
    )
  }
}
