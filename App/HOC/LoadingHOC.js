import React, { Component } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { Colors } from '../Themes/';
import { FETCHING_STATUS } from '../Lib/utils';

export default LoadingHOC = (WrappedComponent) => {
  return class LoadingHOC extends Component {

    constructor(props) {
      super(props);
      this.state = {
        status: FETCHING_STATUS.READY
      }
    }

    componentWillMount() {
      if (this.props.drivingSchool) {
        this.props.requestData();
      } else {
        this.setState({
          status: FETCHING_STATUS.SUCCESS
        })
      }
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        status: nextProps.status
      })
    }

    renderBody = () => {
      switch (this.state.status) {
        case FETCHING_STATUS.READY:
          return null;
        case FETCHING_STATUS.SUCCESS:
          return (<WrappedComponent {...this.props} />);
        case FETCHING_STATUS.ERROR:
          return (<Text>Error occured, please reload screen.</Text>);
        case FETCHING_STATUS.FETCHING:
          return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator animating size="large" color={Colors.primaryWarm}/>
            </View> );
        default:
          return null;
      }
    };

    render() {
      const body = this.renderBody();
      return body;
    }
  }
};
