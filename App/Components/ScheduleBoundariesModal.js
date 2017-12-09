import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics } from '../Themes/';
import Modal from './ModalLayout';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from './CheckBox';
import ButtonPrimary from './ButtonPrimary';
import Moment from 'moment';

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: Colors.strongGrey,
    marginBottom: 15
  },
  description: {
    textAlign: 'center',
    color: Colors.strongGrey
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
    marginTop: 20
  },
  hour: {
    marginHorizontal: 10,
    color: Colors.primaryWarm
  },
  timeIntervalRow: {
    justifyContent: 'center',
    // marginVertical: 15
  },
  dayRow: {
    flexDirection: 'row'
  },
  weekdaysColumn: {
    marginRight: 15
  },
  weekSummarySection: {
    marginBottom: 40
  }
});

const WEEKDAYS = [
  'Poniedzialek', 'Wtorek', 'Sroda', 'Czwartek', 'Piatek', 'Sobota', 'Niedziela'
];

export default class ModalLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeekday: 0,
      weekdays: [
        {weekday: 'monday', start_time: 'X', end_time: 'Y'},
        {weekday: 'tuesday', start_time: 'X', end_time: 'Y'},
        {weekday: 'wednesday', start_time: 'X', end_time: 'Y'},
        {weekday: 'thursday', start_time: 'X', end_time: 'Y'},
        {weekday: 'friday', start_time: 'X', end_time: 'Y'},
        {weekday: 'saturday', start_time: 'X', end_time: 'Y'},
        {weekday: 'sunday', start_time: 'X', end_time: 'Y'}
      ]
    };
    this.nextDay = this.nextDay.bind(this);
    this.prevDay = this.prevDay.bind(this);
  }

  nextDay() {
    this.setState({
      currentWeekday: (this.state.currentWeekday + 1) % WEEKDAYS.length
    });
  }

  prevDay() {
    this.setState({
      currentWeekday: (this.state.currentWeekday - 1) === -1 ? WEEKDAYS.length - 1 : (this.state.currentWeekday - 1)
    });
  }

  render() {
    const { options } = this.props;
    return (
      <Modal {...options} >
        <Text style={styles.title}>Ustaw domyślne godziny pracy</Text>
        <Text style={styles.description}>Ramy czasowe, które teraz wybierzesz umożliwią Tobie oraz twoim pracownikom
          biurowym ustalanie harmonogramu tylko w tym przedziale.</Text>

        <View style={styles.currentWeekdayRow}>
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
          <TouchableOpacity><Text style={styles.hour}>6:00</Text></TouchableOpacity>

          <Text>do</Text>
        <TouchableOpacity><Text style={styles.hour}>20:00</Text></TouchableOpacity>
        </View>

        <View style={styles.row}>
          <CheckBox value={true}/>
          <Text style={{ marginLeft: 15 }}>Zastosuj dla kazego dnia</Text>
        </View>


        <Text>Dni tygodnia: </Text>

        <View style={[styles.row, styles.weekSummarySection]}>
          <View style={styles.weekdaysColumn}>
            {WEEKDAYS.map((element, index) => {
              return (<View style={styles.dayRow} key={`day-${index}`}>
                <CheckBox value={true}/>
                <Text>{element}</Text>
              </View>)
            })}
          </View>
          <View>
            {WEEKDAYS.map((element, index) => {
              const {start_time, end_time} = this.state.weekdays[index];
              return (<Text key={`interval-${index}`}>{start_time}  -  {end_time}</Text>)
            })}
          </View>
        </View>
        <ButtonPrimary>Zatwierdź</ButtonPrimary>
      </Modal>
    );
  }
}
