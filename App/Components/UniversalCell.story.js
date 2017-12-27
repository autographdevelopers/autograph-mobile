import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { View } from 'react-native';
import UniversalCell from './UniversalCell';

storiesOf('Uni. cell')
  .add('separator full-width', () => (
    <UniversalCell separator={'full'} title={'Interesting title'}/>
  ))
  .add('separator padded', () => (
    <UniversalCell separator={'padded'} title={'Interesting title'}/>
  ))
  .add('Custom heading1', () => (
    <UniversalCell/>
  ))
  .add('Custom heading2', () => (
    <UniversalCell/>
  ))
  .add('avat.+title1', () => (
    <UniversalCell/>
  ))
  .add('avat.+title12', () => (
    <UniversalCell/>
  ))
  .add('noavat.+title1', () => (
    <UniversalCell title={'Interesting title'}/>
  ))
  .add('noavat.+title12', () => (
    <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}/>
  ))
  .add('Custom right btn', () => (
    <UniversalCell/>
  ))
  .add('No right btn', () => (
    <UniversalCell/>
  ))
  .add('List larges', () => (
    <View>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'} topLine={true}/>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}/>
    </View>
  ))
  .add('List padded', () => (
    <View>
      <UniversalCell title={'Interesting title'} separator={'padded'} subtitle={'Very interesting subtitle'} topLine={true}/>
      <UniversalCell title={'Interesting title'} separator={'padded'} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} separator={'padded'} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} separator={'padded'} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} separator={'padded'} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} separator={'padded'} subtitle={'Very interesting subtitle'}/>
      <UniversalCell title={'Interesting title'} separator={'padded'} subtitle={'Very interesting subtitle'}/>
    </View>
  ))
  .add('List defaults', () => (
    <View>
      <UniversalCell title={'Interesting title'} topLine={true}/>
      <UniversalCell title={'Interesting title'}/>
      <UniversalCell title={'Interesting title'}/>
      <UniversalCell title={'Interesting title'}/>
      <UniversalCell title={'Interesting title'}/>
      <UniversalCell title={'Interesting title'}/>
    </View>
  ));
