import React from 'react'
import { storiesOf } from '@storybook/react-native'

import ScheduleBoundariesModal from './ScheduleBoundariesView'

storiesOf('bounds')
  .add('Default', () => (
    <ScheduleBoundariesModal/>
  ));
