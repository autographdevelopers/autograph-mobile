import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import styles from './placeholderStyles';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import EmployeesSearchableList from '../Components/EmployeesSearchableList';
import {contextActionCreators} from '../Redux/ContextRedux';

class CalendarScreen extends Component {

  onEmployeeSelected = id => {
    this.props.navigation.goBack(null);
    this.props.setCurrentEmployee(id);
  };

  render() {
    const { currentEmployee } = this.props;
    return (
      <ScrollView style={{flex: 1}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('searchEmployee', {onResultPress: this.onEmployeeSelected})}>
          <Text>Find Employee</Text>
        </TouchableOpacity>
        {currentEmployee && <Text>{`${currentEmployee.name} ${currentEmployee.surname}`}</Text>}
        <View style={{flex: 1}}>
          <Agenda/>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => ({
  currentEmployee: state.employees.active[state.context.currentEmployeeID]
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentEmployee: id => dispatch(contextActionCreators.setCurrentEmployee(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen)
