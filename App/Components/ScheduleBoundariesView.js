import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker';
import _ from 'lodash';

import { slotHelper } from '../Lib/SlotHelpers';
import { Fonts, Colors } from '../Themes/';
import ButtonText from './ButtonText';

const HOUR_PLACEHOLDER = '-:-';
const DEFAULT_HOUR = '12:00';

export default class ScheduleBoundariesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startend: 'start_time'
    }
  }

  setTime = time => {
    const { input: {value, name}, setFormValue } = this.props;
    const { startend } = this.state;
    const roundedTime = slotHelper.roundTimeToHalfHourInterval(time);
    const id = slotHelper.hourToId(roundedTime);

    let newTimeFrames;

    if (startend === 'start_time') {
      // what if last unefined
      if (value.last() !== undefined) {
        newTimeFrames = _.range(id, value.last());
      } else {
        newTimeFrames = _.range(id, id + 1);
      }
    } else if (startend === 'end_time') {
      if (value.first() !== undefined) {
        newTimeFrames = _.range( value.first(), id);
      } else {
        newTimeFrames = _.range( id, id + 1);
      }
    }

    setFormValue(name, newTimeFrames);
  };

  openDatePicker = startend => () => {
    this.setState({
      startend: startend
    });

    this.datePicker.onPressDate();
  };


  applyToAllDays = () => {
    const { input: { value } } = this.props;

    const timeFrames = {
      monday: _.cloneDeep(value),
      tuesday: _.cloneDeep(value),
      wednesday: _.cloneDeep(value),
      thursday: _.cloneDeep(value),
      friday: _.cloneDeep(value),
      saturday: _.cloneDeep(value),
      sunday: _.cloneDeep(value),
    };

    this.props.initForm(timeFrames);
  };

  start_time = frames => {
    return slotHelper.idToHour(frames.first());
  };

  end_time = frames => {
    return slotHelper.idToHour(frames.last() + 1); // ??
  };

  render() {
    const { input: {value}, initForm } = this.props;


    return (
      <View>

        <View style={[styles.row, styles.timeIntervalRow]}>
          <Text>od</Text>
          <TouchableOpacity onPress={this.openDatePicker('start_time')}>
            <Text style={styles.hour}>
              {this.start_time(value) || HOUR_PLACEHOLDER}
            </Text>
          </TouchableOpacity>

          <Text>do</Text>
          <TouchableOpacity onPress={this.openDatePicker('end_time')}>
            <Text style={styles.hour}>
              {this.end_time(value) || HOUR_PLACEHOLDER}
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <ButtonText onPress={this.applyToAllDays}
                      customStyle={styles.applyToAllDays}
                      position={'flex-start'}>
            Zastosuj dla kazego dnia</ButtonText>
        </View>

        <DatePicker
          style={styles.datepicker}
          ref={picker => this.datePicker = picker}
          date={this[this.state.startend](value) || DEFAULT_HOUR}
          showIcon={false}
          mode='time'
          format={slotHelper.TIME_FORMAT}
          minuteInterval={30}
          confirmBtnText='Potwierdz'
          cancelBtnText='Anuluj'
          onDateChange={this.setTime}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: Colors.black,
    marginBottom: 15,
    fontSize: Fonts.size.regular
  },
  currentWeekdayRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  currentWeekday: {
    marginHorizontal: 35,
    width: '50%',
    fontSize: Fonts.size.regular,
    color: Colors.softBlack,
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
  },
  hour: {
    marginHorizontal: 10,
    color: Colors.primaryWarm,
    fontSize: Fonts.size.medium
  },
  timeIntervalRow: {
    justifyContent: 'center'
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  datepicker: {
    height: 0,
    opacity: 0,
    borderWidth: 0
  },
  applyToAllDays: {
    marginVertical: 10
  }
});
