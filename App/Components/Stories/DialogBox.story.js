import React from 'react';
import { storiesOf } from '@storybook/react-native';
import DialogBox from '../DialogBox';
import { TextInput, Text, View } from 'react-native';

storiesOf('DialogBox')
// .add('Default', () => (
//   <View style={{flex:1, backgroundColor: 'grey'}}>
//     <DialogBox visible={true} />
//   </View>
// )).add('Loading mode', () => (
//   <View style={{flex:1, backgroundColor: 'grey'}}>
//     <DialogBox visible={true} />
//   </View>
// ))
.add('W/ children', () => (
  <View style={{flex:1, backgroundColor: 'grey'}}>
    <DialogBox visible={true} >
    <View>
      <Text>Lorem ipsum dolor...</Text>
      <TextInput/>
      <Text>Lorem ipsum dolor...</Text>
      <TextInput/>
      <Text>Lorem ipsum dolor...</Text>
      <TextInput/>
    </View>
    </DialogBox>
  </View>
))



