import { Colors } from '../Themes';
import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const OverlayComponent = ({ show }) => {
  if (show)
    return (
      <View style={styles.loading}>
        <ActivityIndicator size='large' color={Colors.snow}/>
      </View>
    );
  else return null
};

const styles = StyleSheet.create({
  loading: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 100,
  }
});

export const Overlay = connect(state => ({ show: state.views.utils.overlay.show }))(OverlayComponent);
