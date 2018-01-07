import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Colors } from '../Themes/';
import { FETCHING_STATUS } from '../Lib/utils';

export default LoadingHOC = (WrappedComponent) => {
  return class LoadingHOC extends Component {
    render() {
      console.log(this.props);
      return this.props.status === FETCHING_STATUS.FETCHING ?
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator animating size="large" color={Colors.primaryWarm}/>
        </View>
        : <WrappedComponent {...this.props} />;
    }
  }
};
