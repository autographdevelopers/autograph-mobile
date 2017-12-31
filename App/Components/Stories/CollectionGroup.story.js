import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { View, TouchableOpacity, Text } from 'react-native';
import UniversalCell from '../UniversalCell';
import CollectionGroup from '../CollectionGroup';

storiesOf('Collection group')
  .add('default', () => (
    <CollectionGroup/>
  ));
