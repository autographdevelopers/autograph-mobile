import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Colors } from '../Themes/';
import { FETCHING_STATUS } from '../Lib/utils';
import SpinnerView from '../Components/SpinnerView';

export default function withRequiredData(WrappedComponent, statusesKeys) {
  return class LoadingHOC extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      const statuses = statusesKeys.map(status => this.props[status]);

      if(statuses.includes(FETCHING_STATUS.FETCHING))
        return <SpinnerView/>;
      else if (statuses.includes(FETCHING_STATUS.ERROR))
        return <Text>Unexpected error occured.</Text>;
      else if (statuses.every(status => status === FETCHING_STATUS.SUCCESS))
        return  <WrappedComponent {...this.props} />;
      else {
        return <Text>Ready?</Text>
      }
    };
  }
};
