/** Built-in modules */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Picker, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
/** Custom modules */
import CustomDatePicker from '../Components/CustomDatePicker';
import SectionHeader from '../Components/SectionHeader';
import ButtonText from '../Components/ButtonText';
import RadioButton from '../Components/RadioButton';

import { DRIVING_LESSON_STATUSES } from '../Lib/DrivingLessonHelpers';
import { Fonts, Colors } from '../Themes/';

const DATE_FORMAT = 'YYYY-MM-DD';
const RADIO_BUTTONS_GROUP = [
  { status: DRIVING_LESSON_STATUSES.ALL, label: 'Wszystkie' },
  { status: DRIVING_LESSON_STATUSES.ACTIVE, label: 'Odbyte/Nadchodzące' },
  { status: DRIVING_LESSON_STATUSES.CANCELED, label: 'Odwołane' }
]

/** Screen */
export default class DrivingLessonsFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.type,
      fromDate: this.props.fromDate,
      toDate: this.props.toDate
    }
  }

  renderDrivingLessonStatusSelection = () =>
    RADIO_BUTTONS_GROUP.map((option, index) =>
      <View key={index} style={styles.radioButtonRow}>
        <Text style={styles.radioButtonLabel}>{option.label}</Text>
        <RadioButton value={this.state.type}
                     boundValue={option.status}
                     setValue={() => this.setState({type: option.status})}/>
      </View>
    )

  render() {
    const { type, fromDate, toDate } = this.state;

    const fromDatePickerConfiguration = {
      ref: ref => this.datepicker = ref,
      maxDate: toDate,
      format: DATE_FORMAT,
      placeholder: DATE_FORMAT,
      onDateChange: (date) => this.setState({fromDate: date}),
      date: fromDate,
    };

    const toDatePickerConfiguration = {
      ref: ref => this.datepicker = ref,
      minDate: fromDate,
      format: DATE_FORMAT,
      placeholder: DATE_FORMAT,
      onDateChange: (date) => this.setState({toDate: date}),
      date: toDate,
    };

    return(
      <View style={styles.container}>
        <View>
          <SectionHeader title={'Filtry'}/>

          <View style={styles.section}>
            <Text style={styles.dateCaption}>Od:</Text>
            <CustomDatePicker datePickerConfiguration={fromDatePickerConfiguration} />
            <View style={{flex: 1}}></View>
            <ButtonText onPress={() => this.setState({fromDate: null})}>
              <Icon name="md-close" color={Colors.primaryWarm} size={16}/>
            </ButtonText>
          </View>

          <View style={styles.section}>
            <Text style={styles.dateCaption}>Do:</Text>
            <CustomDatePicker datePickerConfiguration={toDatePickerConfiguration} />
            <View style={{flex: 1}}></View>
            <ButtonText onPress={() => this.setState({toDate: null})}>
              <Icon name="md-close" color={Colors.primaryWarm} size={16}/>
            </ButtonText>
          </View>

          <View style={styles.radioButton}>
            {this.renderDrivingLessonStatusSelection()}
          </View>
        </View>

        <ButtonText
          onPress={() => this.props.onPress(this.state.type, this.state.fromDate, this.state.toDate)}
          style={styles.submitButton}>
          <Text>Zastosuj</Text>
        </ButtonText>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 20
  },
  section: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  dateCaption: {
    marginRight: 5
  },
  radioButtonGroup: {
    marginTop: 10
  },
  radioButtonRow: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  radioButtonLabel: {
    marginRight: 10
  },
  submitButton: {
    marginTop: 15,
    alignSelf: 'center'
  }
});
