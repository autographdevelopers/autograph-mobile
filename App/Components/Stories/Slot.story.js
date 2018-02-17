import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { View } from 'react-native';
import Slot from '../Slot';

storiesOf('StepsIndicators')
.add('default', () => (
  <View style={{marginHorizontal: 30}}>
    <Slot />
    <Slot />
    <Slot />
    <Slot />
    <Slot />
    <Slot />
    <Slot />
  </View>
));
