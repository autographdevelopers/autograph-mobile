import React, { Component } from 'react';
import Layout from '../../Components/Layout';

export default class Profile extends Component {
  componentWillUnmount = () => {
    this.props.screenProps.setCurrentEmployee(null);
  };

  render() {
    return (
      <Layout/>
    );
  }
}
