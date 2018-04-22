import '../Config'
import { View, StatusBar } from 'react-native';
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import AppNavigation from '../Navigation/AppNavigation';
import { Colors } from '../Themes';
import { StyleSheet } from "react-native";
import ReduxPersist from '../Config/ReduxPersist';

// create our store
export const store = createStore();

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  componentDidMount() {
    // if redux persist is not active fire startup action
    // if ( !ReduxPersist.active ) {
    //   this.props.startup();
    // }
  }

  render () {
    return (
      <Provider store={store}>
        <View style={styles.applicationView}>
          <StatusBar barStyle='light-content' translucent={true} />
          <AppNavigation/>
        </View>
      </Provider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App


const styles = StyleSheet.create({
  applicationView: {
    flex: 1,
    backgroundColor: Colors.snow,
  },
});
