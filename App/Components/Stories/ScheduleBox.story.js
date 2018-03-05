import React from 'react'
import { storiesOf } from '@storybook/react-native'
import {View} from 'react-native';
import ScheduleBox from '../ScheduleBox';
import {SLOT_STATUS} from '../../Lib/utils';
import { generateDailySlots } from '../../Lib/utils';

const WEEKDAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const buildRandomWeeklySchedule = () => {
  return WEEKDAYS.reduce((acc, current, index, array) => {
    acc[current] = buildRandomSlotsForDay();
    return acc
  }, {})
};

const buildRandomSlotsForDay = () => {
  const STATUSES = Object.values(SLOT_STATUS);
  return generateDailySlots( (index) => STATUSES[index !==0 && index%243===0 ? 1 :0] );
};

const schedule = {
    new_template: buildRandomWeeklySchedule(),
    current_template: buildRandomWeeklySchedule(),
};

storiesOf('ScheduleBox')
.add('default', () => (
  <View style={{flex: 1, paddingVertical: 30, alignItems: 'center' }}>
    <ScheduleBox schedule={schedule.current_template} />
  </View>
));
