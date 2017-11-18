import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'

import ButtonOutline from './ButtonOutline'

storiesOf('ButtonOutline')
  .add('Default', () => (
      <ButtonOutline>default</ButtonOutline>
  ))
  .add('long text', () => (
    <ButtonOutline>Lorem ipsum dolor sit ne</ButtonOutline>
  ))
  .add('custom color', () => (
    <ButtonOutline color={'red'}>Lorem ipsum dolor sit ne</ButtonOutline>
  ))
  .add('capitalized', () => (
    <ButtonOutline>LOG IN</ButtonOutline>
  ))
