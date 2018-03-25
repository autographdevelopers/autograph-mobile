import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import Slot from '../Slots/BookingBy3rdParty';


storiesOf('Booking')
.add('default', () => (
  <View>
    <Slot/>
    <Slot/>
    <Slot/>
    <Slot/>
    <Slot/>
  </View>
));
