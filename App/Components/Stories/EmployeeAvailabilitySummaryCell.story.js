import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import EmployeeAvailabilitySummaryCell from '../EmployeeAvailabilitySummaryCell';


storiesOf('Emyell')
.add('default', () => (
  <View style={{paddingHorizontal: 15}}>
    <EmployeeAvailabilitySummaryCell/>
    <EmployeeAvailabilitySummaryCell/>
    <EmployeeAvailabilitySummaryCell/>
    <EmployeeAvailabilitySummaryCell/>
    <EmployeeAvailabilitySummaryCell/>
  </View>
));
