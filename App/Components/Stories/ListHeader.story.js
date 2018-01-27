import React from 'react'
import { storiesOf } from '@storybook/react-native'
import ListHeader from '../ListHeader';

storiesOf('ListHeader')
.add('default', () => (
  <ListHeader title={'Some header title'} />
));
