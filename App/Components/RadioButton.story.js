import React from 'react'
import { storiesOf } from '@storybook/react-native'
import {View} from 'react-native';
import RadioButton from './RadioButton';

storiesOf('InputField')
  .add('selected', () => (
    <RadioButton value={'a'} input={{value: 'a'}}/>
  ))
  .add('NOT selected', () => (
    <RadioButton value={'a'} input={{value: 'b'}} />
  ));
