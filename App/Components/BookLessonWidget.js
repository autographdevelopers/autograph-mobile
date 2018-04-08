import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { drivingLessonActionCreators } from '../Redux/DrivingLessonRedux';
import { Colors, Fonts } from '../Themes/';
import ButtonText from './ButtonText';

const BookLessonWidget = props => {
  const {
    date,
    fromHour,
    toHour,
    employee,
    student,
    slot_ids,
    createLessonRequest
  } = props;

  const requestParams = {
    employee_id: employee.id,
    student_id: student.id,
    slot_ids
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Umów jazdę</Text>
      </View>

      <View style={styles.dateTimeInfoPane}>
        <Text style={styles.dateTimeInfoText}>{date}</Text>
        <View style={styles.dotSeparator}/>
        <Text style={styles.dateTimeInfoText}>{`${fromHour} - ${toHour}`}</Text>
      </View>

      <View style={styles.partiesRow}>
        <Text style={[styles.person, styles.personLeft]}>{`${employee.name} - ${employee.surname}`}</Text>
        <Text style={styles.conjunction}>lekcja z</Text>
        <Text style={[styles.person, styles.personRight]}>{`${student.name} - ${student.surname}`}</Text>
      </View>

      <View style={styles.buttonsPane}>
        <ButtonText onPress={createLessonRequest(requestParams)} position={'center'} customTextStyle={{fontSize: 17}}>Potwierdź</ButtonText>
      </View>
    </View>
  );
};

const DOT_SIZE = 5;

const styles = {
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.mediumGrey
  },
  dotSeparator: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE/2,
    backgroundColor: Colors.strongGrey
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: Fonts.type.base,
    marginBottom: 15,
  },
  dateTimeInfoPane: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.mediumGrey
  },
  dateTimeInfoText: {
    fontSize: 15,
    fontFamily: Fonts.type.base,
    color: Colors.strongGrey
  },
  confirmBtn: {
    backgroundColor: Colors.primaryWarm
  },
  confirmBtnTxt: {
    textAlign: 'center',
    color: Colors.snow
  },
  conjunction: {
    textAlign: 'center',
    marginVertical: 10,
    color: Colors.strongGrey,
    fontSize: 13
  },
  person: {
    fontSize: 15,
    fontFamily: Fonts.type.base,
    textAlign: 'center'
  },
  partiesRow: {
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.mediumGrey,
  },
  buttonsPane: {
    marginVertical: 15
  }
};

const mapStateToProps = state => ({
  employee: state.employees.active[state.bookLesson.employee_id],
  student: state.students.active[state.bookLesson.student_id],
  slot_ids: state.bookLesson.slot_ids,
  fromHour: state.bookLesson.fromHour,
  toHour: state.bookLesson.toHour,
  date: state.bookLesson.date,
});

const mapDispatchToProps = dispatch => ({
  createLessonRequest: params => () => dispatch(drivingLessonActionCreators.createRequest(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(BookLessonWidget);
