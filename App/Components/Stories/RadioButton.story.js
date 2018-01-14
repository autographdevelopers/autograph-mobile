import React from 'react'
import { storiesOf } from '@storybook/react-native'
import {View} from 'react-native';
import RadioButton from '../RadioButton';

storiesOf('InputField')
  .add('selected', () => (
    <RadioButton boundValue={'a'} input={{value: 'a'}}/>
  ))
  .add('NOT selected', () => (
    <RadioButton boundValue={'a'} input={{value: 'b'}} />
  ));
