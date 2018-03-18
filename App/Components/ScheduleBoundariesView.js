import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import { slotHelper } from '../Lib/SlotHelpers';
import { Fonts, Colors, Metrics } from '../Themes/';
import ButtonText from './ButtonText';
import { roundTimeToHalfHourInterval } from '../Lib/timeHandlers';
import _ from 'lodash';

const HOUR_PLACEHOLDER = '-:-';

export default class ScheduleBoundariesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startend: 'start_time'
    }
  }

  setTime = time => {
    const { input: {value} } = this.props;
    const roundedTime = slotHelper.roundTimeToHalfHourInterval(time);
    const id = slotHelper.hourToId(roundedTime);
    let newTimeFrames;
    const { startend } = this.state;

    if (startend === 'start_time') {
      newTimeFrames = _.range(id, value.last() + 1)
    } else if (startend === 'end_time') {
      newTimeFrames = _.range(value.first(), id)
    }
    this.props.setFormValue(this.props.input.name, newTimeFrames)
  };

  openDatePicker = startend => () => {
    this.setState({
      startend: startend
    });

    this.datePicker.onPressDate();
  };

  clearDay = index => () => {
    // const newWeekdays = [].concat(this.props.value);
    // newWeekdays[index]['start_time'] = null;
    // newWeekdays[index]['end_time'] = null;
    //
    // this.props.setValue(newWeekdays);
  };

  applyToAllDays = () => {
    // const newWeekdays = this.props.value.map((element, index) => ({
    //   ...this.props.value[this.state.currentWeekday],
    //   weekday: element.weekday
    // }));
    //
    // this.props.setValue(newWeekdays);
  };

  start_time = frames => {
    console.log(frames)
    console.log(frames.first)
    return slotHelper.idToHour(frames.first()) || HOUR_PLACEHOLDER;
  };

  end_time = frames => {
    console.log('end')
    console.log(frames)
    console.log(frames.last + 1)
    return slotHelper.idToHour(frames.last() + 1) || HOUR_PLACEHOLDER;
  };

  render() {
    const { input: {value} } = this.props;

    return (
      <View>

        <View style={[styles.row, styles.timeIntervalRow]}>
          <Text>od</Text>
          <TouchableOpacity onPress={this.openDatePicker('start_time')}>
            <Text style={styles.hour}>
              {this.start_time(value)}
            </Text>
          </TouchableOpacity>

          <Text>do</Text>
          <TouchableOpacity onPress={this.openDatePicker('end_time')}>
            <Text style={styles.hour}>
              {this.end_time(value)}
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <ButtonText onPress={this.applyToAllDays} customStyle={styles.applyToAllDays} position={'flex-start'}>
            Zastosuj dla kazego dnia</ButtonText>
        </View>

        <DatePicker
          style={styles.datepicker}
          ref={picker => this.datePicker = picker}
          date={this[this.state.startend](value)}
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
