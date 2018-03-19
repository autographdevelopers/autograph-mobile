import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import styles from './placeholderStyles';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';


export default class CalendarScreen extends Component {
  render() {
    return (
        <Agenda
          onDayPress={(day)=>{console.log(day)}}
        />
    )
  }
}
