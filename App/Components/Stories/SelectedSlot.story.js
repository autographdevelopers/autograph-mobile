import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import Slot from '../Slots/SelectedSlot';


storiesOf('Selected')
.add('default', () => (
  <View>
    <Slot/>
    <Slot/>
    <Slot/>
    <Slot/>
    <Slot/>
  </View>
));
