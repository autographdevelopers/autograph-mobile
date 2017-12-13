import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker';

import { Fonts, Colors, Metrics } from '../Themes/';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from './CheckBox';
import ButtonText from './ButtonText';
import Layout from './Layout';

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

export default class ModalLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startend: 'start_time',
      currentWeekday: 0,
      weekdays: [
        { weekday: 'monday', start_time: null, end_time: null },
        { weekday: 'tuesday', start_time: null, end_time: null },
        { weekday: 'wednesday', start_time: null, end_time: null },
        { weekday: 'thursday', start_time: null, end_time: null },
        { weekday: 'friday', start_time: null, end_time: null },
        { weekday: 'saturday', start_time: null, end_time: null },
        { weekday: 'sunday', start_time: null, end_time: null }
      ]
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
    const newWeekdays = [].concat(this.state.weekdays);
    newWeekdays[this.state.currentWeekday][this.state.startend] = time;
    this.setState({
      weekdays: newWeekdays
    })
  };

  openDatePicker = startend => () => {
    this.setState({
      startend: startend
    });
    this.datePicker.onPressDate();
  };

  isIntervalSet = index => {
    const { start_time, end_time } = this.state.weekdays[index];
    return start_time && end_time;
  };

  clearDay = index => () => {
    const newWeekdays = [].concat(this.state.weekdays);
    newWeekdays[index]['start_time'] = null;
    newWeekdays[index]['end_time'] = null;
    this.setState({
      weekdays: newWeekdays
    })
  };

  applyToAllDays = () => {
    const newWeekdays = this.state.weekdays.map((element, index) => ({
      ...this.state.weekdays[this.state.currentWeekday],
      weekday: element.weekday
    }));
    this.setState({
      weekdays: newWeekdays
    })
  };

  currentStartEndTime = startend => (this.state.weekdays[this.state.currentWeekday][startend] || '-:-');

  render() {
    return (
      <Layout>
        <Text style={styles.title}>Ustaw domyślne godziny pracy.</Text>
        <Text style={styles.description}>Ramy czasowe, które teraz wybierzesz umożliwią Tobie oraz twoim pracownikom
          biurowym ustalanie harmonogramu tylko w tym przedziale.</Text>

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
            style={styles.hour}>{this.currentStartEndTime('start_time')}</Text></TouchableOpacity>

          <Text>do</Text>
          <TouchableOpacity onPress={this.openDatePicker('end_time')}><Text
            style={styles.hour}>{this.currentStartEndTime('end_time')}</Text></TouchableOpacity>
        </View>

        <ButtonText onPress={this.applyToAllDays} customStyle={styles.applyToAllDays}>Zastosuj dla kazego dnia</ButtonText>

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
                const { start_time, end_time } = this.state.weekdays[index];
                return (<Text key={`interval-${index}`} style={styles.weekdayItem}>{start_time || '-:-'}   -   {end_time || '-:-'}</Text>)
              })
            }
          </View>
        </View>

        <DatePicker
          style={styles.datepicker}
          ref={picker => this.datePicker = picker}
          date={this.state.weekdays[this.state.currentWeekday][this.state.startend]}
          showIcon={false}
          mode='time'
          minuteInterval={30}
          confirmBtnText='Potwierdz'
          cancelBtnText='Anuluj'
          onDateChange={ date => this.setTime(date) }
        />
      </Layout>
    );
  }
}
