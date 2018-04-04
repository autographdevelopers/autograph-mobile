import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { drivingLessonActionCreators } from '../Redux/DrivingLessonRedux';

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
      <Text>Umów jazdę</Text>
      <Text>{date}</Text>
      <Text>{`${fromHour} - ${toHour}`}</Text>
      <Text>{`${employee.name} - ${employee.surname}`}</Text>
      <Text>lekcja z</Text>
      <Text>{`${student.name} - ${student.surname}`}</Text>

      <TouchableOpacity onPress={createLessonRequest(requestParams)}>
        <Text>Potwierdź</Text>
      </TouchableOpacity>
    </View>
  );
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
