import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Layout from '../Components/Layout'
import IconF from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconE from 'react-native-vector-icons/Entypo';
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
          leftIcon={<View style={{justifyContent: 'center', marginRight: 15}}><IconF size={30} name={'cog'} color={Colors.strongGrey} style={{alignSelf: 'center'}} /></View>}
          title={'Information'}
          subtitle={'Edit basic info about your school.'}
          containerStyle={{ borderBottomWidth: 0 }}
          keyExtractor={(item, index) => index}
          onPress={() => {
            navigation.navigate('editSchoolInfo', navParams)
          }}
        />

        <ListItem
          leftIcon={<View style={{justifyContent: 'center', marginRight: 15}}><IconM size={30} name={'schedule'} color={Colors.strongGrey} style={{alignSelf: 'center'}} /></View>}
          title={'Schedule Bounadries'}
          subtitle={'Edit schedule boundaries'}
          containerStyle={{ borderBottomWidth: 0 }}
          keyExtractor={(item, index) => index}
          onPress={() => {
            navigation.navigate('editScheduleBoundaries', navParams)
          }}
        />

        <ListItem
          leftIcon={<View style={{justifyContent: 'center', marginRight: 15}}><Icon size={30} name={'calendar'} color={Colors.strongGrey}/></View>}
          title={`Calendar`}
          subtitle={'Edit calendar settings'}
          containerStyle={{ borderBottomWidth: 0 }}
          keyExtractor={(item, index) => index}
          onPress={() => {
            navigation.navigate('editScheduleSettings', navParams)
          }}
        />

        <ListItem
          leftIcon={<View style={{justifyContent: 'center', marginRight: 15}}><IconE size={30} name={'trash'} color={Colors.salmon}/></View>}
          title={`Usun szkole`}
          subtitle={'Lorem ipsum dolor sit melt'}
          containerStyle={{ borderBottomWidth: 0 }}
          keyExtractor={(item, index) => index}
          onPress={() => {
            // navigation.navigate('editScheduleSettings', navParams)
          }}
        />
      </Layout>
    )
  }
}
