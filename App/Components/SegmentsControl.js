import SegmentedControlTab from 'react-native-segmented-control-tab';
import React, { Component } from 'react';
import { Colors } from '../Themes/';
import { Fonts } from '../Themes';

export default SegmentsControl = ({ componentProps }) => {
  const tabsContainerStyle = {
    marginTop: 25,
    width: '80%',
    alignSelf: 'center'

  };

  const tabStyle = {
    borderColor: Colors.primaryWarm,
    paddingVertical: 7,

  };

  const tabTextStyle = {
    color: Colors.primaryWarm,
    fontFamily: Fonts.type.regular
  };

  const activeTabStyle = {
    backgroundColor: Colors.primaryWarm
  };

  return (
    <SegmentedControlTab {...componentProps} tabsContainerStyle={tabsContainerStyle} tabStyle={tabStyle}
                         tabTextStyle={tabTextStyle} activeTabStyle={activeTabStyle}/>
  )
}
