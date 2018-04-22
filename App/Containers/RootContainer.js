import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import AppWithNavigation from '../Navigation/ReduxNavigation';
import { connect } from 'react-redux';
import StartupActions from '../Redux/StartupRedux';
import ReduxPersist from '../Config/ReduxPersist';
import { StyleSheet } from 'react-native';
import { Colors } from '../Themes';
import { contextActionCreators } from '../Redux/ContextRedux';
import I18n from '../I18n';
import { modalActionCreators } from '../Redux/ModalRedux';

const styles = StyleSheet.create({
  applicationView: {
    flex: 1,
    backgroundColor: Colors.snow,
  },
});

export default class RootContainer extends Component {
  componentDidMount() {
    // if redux persist is not active fire startup action
    if ( !ReduxPersist.active ) {
      this.props.startup();
    }
  }

  render() {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' translucent={true}/>
        <AppWithNavigation />
      </View>
    );
  }
}
