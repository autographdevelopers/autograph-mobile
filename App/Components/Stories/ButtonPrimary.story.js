import React from 'react'
import { storiesOf } from '@storybook/react-native'
import {View} from 'react-native';
import ButtonPrimary from '../ButtonPrimary';

storiesOf('Button Primary')
  .add('Default', () => (
    <ButtonPrimary>Register</ButtonPrimary>
  ))
  .add('Warning', () => (
    <ButtonPrimary theme={'warning'}>Yes I do</ButtonPrimary>
  ))
  .add('Submitting', () => (
    <ButtonPrimary submitting={true}>Yes I do</ButtonPrimary>
  ))
  .add('Long text', () => (
    <ButtonPrimary>Approvesdasdasdasdadsadsdsasd</ButtonPrimary>
  ));
