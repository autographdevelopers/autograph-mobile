import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import { slotHelper } from '../Lib/SlotHelpers';
import { Fonts, Colors, Metrics } from '../Themes/';
import CheckBox from './CheckBox';
import ButtonText from './ButtonText';
import { roundTimeToHalfHourInterval } from '../Lib/timeHandlers';
import _ from 'lodash';

const WEEKDAYS = [
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
];

const HOUR_PLACEHOLDER = '-:-';

export default class ScheduleBoundariesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startend: 'start_time',
      currentWeekday: 0
    };
  }

  nextDay = () => {
    this.setState({
      currentWeekday: (this.state.currentWeekday + 1) % WEEKDAYS.length
    });
  };

  prevDay = () => {
    this.setState({
      currentWeekday: (this.state.currentWeekday - 1) === -1 ? WEEKDAYS.length - 1 : (this.state.currentWeekday - 1)
    });
  };

  setTime = time => {
    const { input: {value} } = this.props;
    const roundedTime = slotHelper.roundTimeToHalfHourInterval(time);
    const currentDay = WEEKDAYS[this.state.currentWeekday];

    let newState = _.cloneDeep(value);

    const id = slotHelper.hourToId(roundedTime);
    if (this.state.startend === 'start_time') {
      newState[currentDay][0] = id;
      const x = newState[currentDay].last - id;
      // for let i =
    } else if (this.state.startend === 'end_time') {
      newState[currentDay][1] = id;
    }

    const newWeekdays = [].concat(this.props.value),
      timeArray = time.split(':'),
      m = timeArray[1],
      h = timeArray[0];

    const { hour, minutes } = roundTimeToHalfHourInterval(h, m);
    const datetime = moment();

    datetime.hours(hour);
    datetime.minutes(minutes);
    newWeekdays[this.state.currentWeekday][this.state.startend] = datetime;

    this.props.setValue(newWeekdays);
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

  start_time = day => {
    const { input: {value} } = this.props;
    const currentDayTimeFrames = value[day];
    console.log('start')
    console.log(day)
    console.log(value)
    console.log(currentDayTimeFrames)
    console.log(currentDayTimeFrames.first)
    return slotHelper.idToHour(currentDayTimeFrames.first()) || HOUR_PLACEHOLDER;
  };

  end_time = day => {
    const { input: {value} } = this.props;
    const currentDayTimeFrames = value[day];
    console.log('end')
    console.log(day)
    console.log(value)
    console.log(currentDayTimeFrames)
    console.log(currentDayTimeFrames.last + 1)
    return slotHelper.idToHour(currentDayTimeFrames.last() + 1) || HOUR_PLACEHOLDER;
  };

  render() {
    const { input: {value} } = this.props;

    console.log('render method!!')

    return (
      <ScrollView>
        <View style={[styles.currentWeekdayRow, styles.row]}>
          <TouchableOpacity onPress={this.prevDay}>
            <Icon name={'angle-left'} size={30} color={Colors.primaryWarm}/>
          </TouchableOpacity>
          <Text style={styles.currentWeekday}>{WEEKDAYS[this.state.currentWeekday]}</Text>
          <TouchableOpacity onPress={this.nextDay}>
            <Icon name={'angle-right'} size={30} color={Colors.primaryWarm}/>
          </TouchableOpacity>
        </View>

        <View style={[styles.row, styles.timeIntervalRow]}>
          <Text>od</Text>
          <TouchableOpacity onPress={this.openDatePicker('start_time')}>
            <Text style={styles.hour}>
              {this.start_time(WEEKDAYS[this.state.currentWeekday])}
            </Text>
          </TouchableOpacity>

          <Text>do</Text>
          <TouchableOpacity onPress={this.openDatePicker('end_time')}>
            <Text style={styles.hour}>
              {this.end_time(WEEKDAYS[this.state.currentWeekday])}
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <ButtonText onPress={this.applyToAllDays} customStyle={styles.applyToAllDays} position={'flex-start'}>Zastosuj
            dla kazego dnia</ButtonText>
        </View>
        {
          WEEKDAYS.map((day, index) => {
            const [start_id, end_id] = value[day];
            const checked = (typeof(start_id) !== undefined) && (typeof(end_id) !== undefined);

            return (
              <View style={styles.dayRow} key={`day-${index}`}>
                <View style={styles.weekdayLabelContainer}>
                  <CheckBox value={checked} setValue={()=>{}}/>
                  <Text style={styles.weekdayLabel}>{day}</Text>
                </View>

                <View style={styles.weekdayInfo}>
                  <Text>
                    {`${this.start_time(day)} - ${this.end_time(day)}`}
                  </Text>
                </View>
              </View>
            )
          })
        }
        <DatePicker
          style={styles.datepicker}
          ref={picker => this.datePicker = picker}
          date={this[this.state.startend](WEEKDAYS[this.state.currentWeekday])}
          showIcon={false}
          mode='time'
          format={slotHelper.TIME_FORMAT}
          minuteInterval={30}
          confirmBtnText='Potwierdz'
          cancelBtnText='Anuluj'
          onDateChange={this.setTime}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: Colors.black,
    marginBottom: 15,
    fontSize: Fonts.size.regular
  },
  description: {
    color: Colors.strongGrey,
    marginBottom: 15
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
    marginVertical: 10
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
  weekdayInfo: {
    justifyContent: 'center',
    flex: 1,
    marginVertical: 5
  },
  weekdayLabelContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  weekdayLabel: {
    marginHorizontal: 10,
    marginVertical: 10
  },
  applyToAllDays: {
    marginVertical: 10
  }
});
