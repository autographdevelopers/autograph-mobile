import React from 'react'
import { storiesOf } from '@storybook/react-native'
import {View} from 'react-native';
  import InputField from './InputField';

storiesOf('InputField')
  .add('Default', () => (
    <InputField label={'Name'} placeholder={'Type in your name.'} input={{value: ''}} meta={{error: null}} />
  ))
  .add('With value', () => (
    <InputField label={'Name'} placeholder={'Type in your name.'} input={{value: 'Some sample name'}} meta={{error: null}} />
  ))
  .add('Required', () => (
    <InputField label={'Name'} required={true} placeholder={'Type in your name.'} input={{value: 'Some sample name'}} meta={{error: null}} />
  ))
  .add('Error', () => (
    <InputField label={'Email'} required={true} input={{value: '@@dsakjdksa.dsds.d@@'}} meta={{error: 'Invalid email format'}} />
  ))
  .add('Long label', () => (
    <InputField label={'Some very very very long label'} required={true} placeholder={'Type in your name.'} input={{value: 'Some sample name'}} meta={{error: null}} />
  ))
  .add('Long text', () => (
    <InputField label={'Name'} required={true} placeholder={'Type in your name.'} input={{value: 'lorem ipsum dolor sit melt dmaskdmaksmdksamdksamdkasdmddsamks'}} meta={{error: null}} />
  ))
  .add('Multiple inputs', () => (
    <View>
      <InputField label={'Name'} placeholder={'Type in your name.'} input={{value: ''}} meta={{error: null}}/>
      <InputField label={'Name'} placeholder={'Type in your name.'} input={{value: 'Some sample name'}} meta={{error: null}}/>
      <InputField label={'Name'} required={true} placeholder={'Type in your name.'} input={{value: 'Some sample name'}} meta={{error: null}}/>
      <InputField label={'Email'} required={true} input={{value: '@@dsakjdksa.dsds.d@@'}} meta={{error: 'Invalid email format'}} />
      <InputField label={'Some very very very long label'} required={true} placeholder={'Type in your name.'} input={{value: 'Some sample name'}} meta={{error: null}}/>
      <InputField label={'Email'} required={true} input={{value: '@@dsakjdksa.dsds.d@@'}} meta={{error: 'Invalid email format'}} />
      <InputField label={'Name'} placeholder={'Type in your name.'} input={{value: ''}} meta={{error: null}}/>
    </View>
  ));
