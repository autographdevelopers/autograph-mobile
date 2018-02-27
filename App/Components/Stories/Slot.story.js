import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import Slot from '../Slot';
import { SLOT_STATUS } from '../../Lib/utils';

const slot= {
  start_hour: '13:30'
}

const renderSlots1 = () => {
  let a = new Array(20).fill();
  console.log(a);

  a = a.map((item, index) => {return <Slot key={index} slot={{...slot, status: index %3 !== 0 ? 'BOOKED' : 'FREE'}} containerStyles={{position: 'absolute', top: index*43}} index={index}/>} )
  console.log(a);

  return a;
};

const renderSlots2 = () => {
  let a = new Array(20).fill();
  console.log(a);

  a = a.map((item, index) => {return <Slot slot={{...slot, status: index %3 !== 0 ? 'BOOKED' : 'FREE'}} key={index} index={index} />} )
  console.log(a);

  return a;
};

storiesOf('Slots')
.add('default', () => (
  <View style={{ marginHorizontal: 40 }}>
    {renderSlots2()}
  </View>
))
.add('stacked', () => (
  <View style={{ marginHorizontal: 40 }}>
    {renderSlots1()}
  </View>
));
