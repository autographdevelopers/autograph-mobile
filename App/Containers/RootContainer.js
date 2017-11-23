import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import AppWithNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  applicationView: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
    // paddingHorizontal: 15
  }
});

class RootContainer extends Component {
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='default' translucent={true}/>
        <AppWithNavigation />
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)
