import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import EmployeeAvailabilitySummaryCell from '../EmployeeAvailabilitySummaryCell';


const employee = {
  name: 'Wojtek',
  surname: 'Pospieszynski'
};

const slots = [
  {
    driving_lesson_id: 1,
    driving_school_id: 28,
    employee_id: 112,
    id: 131,
    locking_user_id: null,
    release_at: null,
    start_time: "2018-04-29T20:00:00.000Z"
  },
  {
    driving_lesson_id: 1,
    driving_school_id: 28,
    employee_id: 112,
    id: 132,
    locking_user_id: null,
    release_at: null,
    start_time: "2018-04-29T20:30:00.000Z"
  },
  {
    driving_lesson_id: null,
    driving_school_id: 28,
    employee_id: 112,
    id: 133,
    locking_user_id: null,
    release_at: null,
    start_time: "2018-04-29T21:00:00.000Z"
  },
  {
    driving_lesson_id: null,
    driving_school_id: 28,
    employee_id: 112,
    id: 133,
    locking_user_id: null,
    release_at: null,
    start_time: "2018-04-29T21:30:00.000Z"
  },
  {
    driving_lesson_id: null,
    driving_school_id: 28,
    employee_id: 112,
    id: 133,
    locking_user_id: null,
    release_at: null,
    start_time: "2018-04-29T18:00:00.000Z"
  },
  {
    driving_lesson_id: null,
    driving_school_id: 28,
    employee_id: 112,
    id: 133,
    locking_user_id: null,
    release_at: null,
    start_time: "2018-04-29T19:00:00.000Z"
  },
  {
    driving_lesson_id: null,
    driving_school_id: 28,
    employee_id: 112,
    id: 133,
    locking_user_id: null,
    release_at: null,
    start_time: "2018-04-29T17:00:00.000Z"
  },
  {
    driving_lesson_id: null,
    driving_school_id: 28,
    employee_id: 112,
    id: 133,
    locking_user_id: null,
    release_at: null,
    start_time: "2018-04-29T15:00:00.000Z"
  },
];

storiesOf('da')
.add('default', () => (
  <View style={{paddingHorizontal: 15}}>
    <EmployeeAvailabilitySummaryCell employee={employee} onCalendarPress={()=>{}} slots={slots}/>
    <EmployeeAvailabilitySummaryCell employee={employee} slots={slots}/>
    <EmployeeAvailabilitySummaryCell employee={employee} slots={slots}/>
    <EmployeeAvailabilitySummaryCell employee={employee} slots={slots}/>
    <EmployeeAvailabilitySummaryCell employee={employee} slots={slots}/>
  </View>
));
