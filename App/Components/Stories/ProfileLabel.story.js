import React from 'react'
import { storiesOf } from '@storybook/react-native'
import ProfileLabel from '../ProfileLabel';

const person = {
  name: 'Wojciech',
  surname: 'Pospieszynki',
  type: 'Employee'
};

storiesOf('ProfileLabel')
.add('default', () => (
  <ProfileLabel avatarProps={{index: 1, name: person.name}} user={person}/>
));
