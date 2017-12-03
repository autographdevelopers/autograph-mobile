import React from 'react'
import { storiesOf } from '@storybook/react-native'
import {View} from 'react-native';
import StepsIndicators from './StepsIndicators';

storiesOf('StepsIndicators')
  .add('2 steps', () => (
    <StepsIndicators labels={['Powiadomienia', 'Informacje']} activeIndex={0} />
  ))
  .add('3 steps', () => (
    <StepsIndicators labels={['Powiadomienia', 'Kalendarz', 'Informacje']} activeIndex={1}  />
  ))
  .add('4 steps', () => (
    <StepsIndicators labels={['Powiadomienia', 'Kalendarz', 'Informacje', 'Zaawansowane']} activeIndex={2} />
  ))
  .add('On the first step', () => (
    <StepsIndicators labels={['Powiadomienia', 'Kalendarz', 'Informacje']} activeIndex={0} />
  ))
  .add('On the second step', () => (
    <StepsIndicators labels={['Powiadomienia', 'Kalendarz', 'Informacje']} activeIndex={1} />
  ))
  .add('On the last step', () => (
    <StepsIndicators labels={['Powiadomienia', 'Kalendarz', 'Informacje', 'Zaawansowane']} activeIndex={3} />
  ));

