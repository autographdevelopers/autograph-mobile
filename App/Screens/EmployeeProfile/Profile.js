import React, { Component } from 'react';
import Layout from '../../Components/Layout';

export default class Profile extends Component {
  componentWillUnmount = () => {
    this.props.navigation.state.params.setCurrentEmployee(null);
  };

  render() {
    return (
      <Layout/>
    );
  }
}
