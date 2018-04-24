import React, { Component } from 'react';
import { View } from 'react-native';
import { Colors } from '../Themes/';

export default function withFluidLayout(WrappedComponent, customContainerStyle={}) {
  return class ComponentWrappedInLayout extends Component {
    render() {
      return(
        <View style={[styles.container, customContainerStyle]}>
          <WrappedComponent {...this.props} />
        </View>
      )
    };
  }
};

const styles = {
  container: {
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: 'white'
  }
};
