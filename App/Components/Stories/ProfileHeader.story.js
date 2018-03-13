import React from 'react'
import { storiesOf } from '@storybook/react-native'
import ProfileHeader from '../EmployeeProfileHeader';

const person = {
  name: 'Wojciech',
  surname: 'Pospieszynki',
  email: 'pospiech@example.com',
  phone_number: '7778888709',
  type: 'Employee'
};

storiesOf('ProfileHeader')
.add('default', () => (
  <ProfileHeader avatarProps={{index: 1, name: person.name}} user={person}/>
));
