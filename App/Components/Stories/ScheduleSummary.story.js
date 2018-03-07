import React from 'react'
import { storiesOf } from '@storybook/react-native'
import {View} from 'react-native';
import ScheduleSummary from '../ScheduleSummary';
import {SLOT_STATUS} from '../../Lib/utils';
import { generateDailySlots } from '../../Lib/utils';

const WEEKDAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const buildRandomWeeklySchedule = () => {
  return WEEKDAYS.reduce((acc, current, index, array) => {
    const STATUSES = Object.values(SLOT_STATUS);

    if(index %4 !== 0) {
      acc[current] = generateDailySlots(
        (index) => STATUSES[index !== 0 && index % 12 === 0 ? 1 : 0]);
    } else {
      acc[current] = generateDailySlots(
        (index) => STATUSES.FREE);
    }
    return acc
  }, {})
};

const schedule = {
  new_template: buildRandomWeeklySchedule(),
  current_template: buildRandomWeeklySchedule(),
};

storiesOf('ScheduleSummary')
.add('default', () => (
  <View style={{flex: 1, paddingVertical: 30, alignItems: 'center' }}>
    <ScheduleSummary schedule={schedule.current_template} />
  </View>
));
