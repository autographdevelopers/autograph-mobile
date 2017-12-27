import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { View, TouchableOpacity, Text } from 'react-native';
import UniversalCell from './UniversalCell';


const CustomRightBtn = () => (
  <TouchableOpacity><Text style={{ color: 'red', fontSize: 15 }}>Usun</Text></TouchableOpacity>
);

storiesOf('Uni. cell')
  .add('separator full-width', () => (
    <View>
      <UniversalCell separator={'full'} title={'Interesting title'}/>
      <UniversalCell separator={'full'} title={'Interesting title'}/>
      <UniversalCell separator={'full'} title={'Interesting title'}/>
      <UniversalCell separator={'full'} title={'Interesting title'}/>
      <UniversalCell separator={'full'} title={'Interesting title'}/>
      <UniversalCell separator={'full'} title={'Interesting title'}/>
      <UniversalCell separator={'full'} title={'Interesting title'}/>
    </View>
  ))
  .add('separator padded', () => (
    <View>
      <UniversalCell separator={'padded'} title={'Interesting title'}/>
      <UniversalCell separator={'padded'} title={'Interesting title'}/>
      <UniversalCell separator={'padded'} title={'Interesting title'}/>
      <UniversalCell separator={'padded'} title={'Interesting title'}/>
      <UniversalCell separator={'padded'} title={'Interesting title'}/>
      <UniversalCell separator={'padded'} title={'Interesting title'}/>
      <UniversalCell separator={'padded'} title={'Interesting title'}/>
    </View>
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
  .add('l cust. right btn', () => (
    <View>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}
                     CustomRightBtn={CustomRightBtn}/>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}
                     CustomRightBtn={CustomRightBtn}/>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}
                     CustomRightBtn={CustomRightBtn}/>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}
                     CustomRightBtn={CustomRightBtn}/>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}
                     CustomRightBtn={CustomRightBtn}/>
      <UniversalCell title={'Interesting title'} subtitle={'Very interesting subtitle'}
                     CustomRightBtn={CustomRightBtn}/>
    </View>
  ))
  .add('s cust. right btn', () => (
    <View>
      <UniversalCell title={'Interesting title'} CustomRightBtn={CustomRightBtn}/>
      <UniversalCell title={'Interesting title'} CustomRightBtn={CustomRightBtn}/>
      <UniversalCell title={'Interesting title'} CustomRightBtn={CustomRightBtn}/>
      <UniversalCell title={'Interesting title'} CustomRightBtn={CustomRightBtn}/>
      <UniversalCell title={'Interesting title'} CustomRightBtn={CustomRightBtn}/>
      <UniversalCell title={'Interesting title'} CustomRightBtn={CustomRightBtn}/>
    </View>
  ))
  .add('No right btn', () => (
    <View>
      <UniversalCell title={'Interesting title'} CustomRightBtn={null}/>
      <UniversalCell title={'Interesting title'} CustomRightBtn={null}/>
      <UniversalCell title={'Interesting title'} CustomRightBtn={null}/>
      <UniversalCell title={'Interesting title'} CustomRightBtn={null}/>
      <UniversalCell title={'Interesting title'} CustomRightBtn={null}/>
      <UniversalCell title={'Interesting title'} CustomRightBtn={null}/>
      <UniversalCell title={'Interesting title'} CustomRightBtn={null}/>
    </View>
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
      <UniversalCell title={'Interesting title'} separator={'padded'} subtitle={'Very interesting subtitle'}
                     topLine={true}/>
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
