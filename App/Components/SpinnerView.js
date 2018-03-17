import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { Colors, Fonts } from '../Themes/index';

/** Fills available space and centers spinner */

export default SpinnerView = props => {
  const {
    label,
    customIndicatorStyles={},
    customContainerStyle={},
    customLabelStyle={}
  } = props;

  return (
    <View style={[styles.container, customContainerStyle]}>
      <ActivityIndicator color={Colors.primaryWarm}
                       size={'large'}
                       style={customIndicatorStyles}/>
      {label && <Text style={[styles.loaderText, customLabelStyle]}>{label}</Text>}
    </View>
  )
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  loaderText: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.medium,
    fontWeight: '300',
    backgroundColor: 'transparent',
  }
};
