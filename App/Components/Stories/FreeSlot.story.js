import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import Slot from '../Slots/FreeSlot';


storiesOf('FreeSlor')
.add('default', () => (
  <View>
    <Slot/>
    <Slot/>
    <Slot/>
    <Slot/>
    <Slot/>
  </View>
));
