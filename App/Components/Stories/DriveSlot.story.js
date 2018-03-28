import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import Slot from '../Slots/DriveSlot';


storiesOf('DriveSlot')
.add('default', () => (
  <View>
    <Slot/>
    <Slot/>
    <Slot/>
    <Slot/>
    <Slot/>
  </View>
));
