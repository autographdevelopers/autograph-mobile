import React from 'react'
import { storiesOf } from '@storybook/react-native'

import ScheduleBoundariesModal from './ScheduleBoundariesModal'

storiesOf('bounds')
  .add('Default', () => (
    <ScheduleBoundariesModal/>
  ))
  .add('Text as children', () => (
    <ScheduleBoundariesModal/>
  ));
