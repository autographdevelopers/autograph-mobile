import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  Text,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { Colors, Fonts } from '../Themes/index';

export default SpinnerView = ({label}) => (
  <View style={styles.spinnerView}>
    <ActivityIndicator color={Colors.primaryWarm} size={'large'}/>
  </View>
);

const MODAL_SPINNER_MODE_SIZE = 300;

const styles = StyleSheet.create({
  // triangle: {
  //   /** shape */
  //   width: 0,
  //   height: 0,
  //   borderTopWidth: MODAL_SPINNER_MODE_SIZE,
  //   borderRightWidth: MODAL_SPINNER_MODE_SIZE,
  //   borderRightColor: Colors.subtleGray,
  //   borderTopColor: 'transparent',
  //   /** position */
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  // },
  spinnerView: {
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
});
