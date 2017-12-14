import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker';

import { Fonts, Colors, Metrics } from '../Themes/';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from './CheckBox';
import ButtonText from './ButtonText';
import Layout from './Layout';
import moment from 'moment';

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
  weekdaysColumn: {
    marginRight: 20
  },
  datepicker: {
    height: 0,
    opacity: 0,
    borderWidth: 0,
  },
  weekdayItem: {
    marginVertical: 10,
    marginLeft: 15
  },
  applyToAllDays: {
    marginVertical: 10
  }
});

const WEEKDAYS = [
  'Poniedzialek', 'Wtorek', 'Sroda', 'Czwartek', 'Piatek', 'Sobota', 'Niedziela'
];

const TIME_FORMAT = 'HH:mm';

export default class ModalLayout extends Component {
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
    const newWeekdays = [].concat(this.props.value),
    timeArray = time.split(':'),
    minutes = timeArray[1],
    hours = timeArray[0],
    datetime = moment();

    datetime.hours(hours);
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

  isIntervalSet = index => {
    const { start_time, end_time } = this.props.value[index];
    return start_time && end_time;
  };

  clearDay = index => () => {
    const newWeekdays = [].concat(this.props.value);
    newWeekdays[index]['start_time'] = null;
    newWeekdays[index]['end_time'] = null;

    this.props.setValue(newWeekdays);
  };

  applyToAllDays = () => {
    const newWeekdays = this.props.value.map((element, index) => ({
      ...this.props.value[this.state.currentWeekday],
      weekday: element.weekday
    }));

    this.props.setValue(newWeekdays);
  };

  currentStartEndTime = (startend, value) => ( this.displayTime(value[this.state.currentWeekday][startend]) );

  displayTime = datetime => (
    datetime ? datetime.format(TIME_FORMAT) : '-:-'
  );

  render() {
    const {value} = this.props;

    return (
      <Layout>
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
          <TouchableOpacity onPress={this.openDatePicker('start_time')}><Text
            style={styles.hour}>{this.currentStartEndTime('start_time', value)}</Text></TouchableOpacity>

          <Text>do</Text>
          <TouchableOpacity onPress={this.openDatePicker('end_time')}><Text
            style={styles.hour}>{this.currentStartEndTime('end_time', value)}</Text></TouchableOpacity>
        </View>

        <View>
          <ButtonText onPress={this.applyToAllDays} customStyle={styles.applyToAllDays} position={'flex-start'}>Zastosuj dla kazego dnia</ButtonText>
        </View>
        <View style={styles.row}>
          <View style={styles.weekdaysColumn}>
            {
              WEEKDAYS.map((element, index) => (
                <View style={styles.dayRow} key={`day-${index}`}>
                  <CheckBox value={this.isIntervalSet(index)} setValue={this.clearDay(index)}/>
                  <Text style={styles.weekdayItem}>{element}</Text>
                </View>)
              )
            }
          </View>
          <View>
            {
              WEEKDAYS.map((_, index) => {
                const { start_time, end_time } =  value[index];
                return (<Text key={`interval-${index}`} style={styles.weekdayItem}>{this.displayTime(start_time)}   -   {this.displayTime(end_time)}</Text>)
              })
            }
          </View>
        </View>

        <DatePicker
          style={styles.datepicker}
          ref={picker => this.datePicker = picker}
          date={this.displayTime(value[this.state.currentWeekday][this.state.startend])}
          showIcon={false}
          mode='time'
          format={TIME_FORMAT}
          minuteInterval={30}
          confirmBtnText='Potwierdz'
          cancelBtnText='Anuluj'
          onDateChange={ date => this.setTime(date) }
        />
      </Layout>
    );
  }
}
