import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Colors } from '../Themes/';
import { FETCHING_STATUS } from '../Lib/utils';
import SpinnerView from '../Components/SpinnerView';

export default function withRequiredData(WrappedComponent, statusKey, requestDataPropFunc, requestDataPropArgs) {
  return class WithRequiredDataHOC extends Component {
    componentWillMount() {
      console.log('componentWillMount');

      this.props[requestDataPropFunc](this.props[requestDataPropArgs]);
    }

    render() {
      switch(this.props[statusKey]) {
        case FETCHING_STATUS.FETCHING:
          return <SpinnerView/>;
        case FETCHING_STATUS.READY:
          return <SpinnerView/>;
        case FETCHING_STATUS.ERROR:
          return <Text>Unexpected error occured.</Text>
        case FETCHING_STATUS.SUCCESS:
          return  <WrappedComponent {...this.props} />;
      }
    };
  }
};
