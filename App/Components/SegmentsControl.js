import SegmentedControlTab from 'react-native-segmented-control-tab';
import React, { Component } from 'react';
import { Colors } from '../Themes/';

export default SegmentsControl = ({ componentProps }) => {
  const tabsContainerStyle = {
    marginVertical: 25,
    marginHorizontal: 45
  };

  const tabStyle = {
    borderColor: Colors.primaryWarm,
    paddingVertical: 7,

  };

  const tabTextStyle = {
    color: Colors.primaryWarm
  };

  const activeTabStyle = {
    backgroundColor: Colors.primaryWarm
  };

  return (
    <SegmentedControlTab {...componentProps} tabsContainerStyle={tabsContainerStyle} tabStyle={tabStyle}
                         tabTextStyle={tabTextStyle} activeTabStyle={activeTabStyle}/>
  )
}
