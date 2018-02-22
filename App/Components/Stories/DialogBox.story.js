import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import DialogBox from '../DialogBox';

storiesOf('DialogBox').add('Default', () => (
  <View style={{flex:1, backgroundColor: 'grey'}}>
    <DialogBox visible={true} />
  </View>
));

