import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import AppWithNavigation from '../Navigation/ReduxNavigation';
import { connect } from 'react-redux';
import StartupActions from '../Redux/StartupRedux';
import ReduxPersist from '../Config/ReduxPersist';
import { StyleSheet } from 'react-native';
import { Colors } from '../Themes';
import { contextActionCreators } from '../Redux/ContextRedux';

const styles = StyleSheet.create({
  applicationView: {
    flex: 1,
    backgroundColor: Colors.snow,
  },
});

class RootContainer extends Component {
  componentDidMount() {
    // if redux persist is not active fire startup action
    if ( !ReduxPersist.active ) {
      this.props.startup();
    }
  }

  render() {
    const { setCurrentDrivingSchool,
      setCurrentEmployee,
      setCurrentStudent,
      currentDrivingSchool,
      currentEmployee,
      currentStudent } = this.props;

    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' translucent={true}/>
        <AppWithNavigation screenProps={{
          setCurrentDrivingSchool,
          setCurrentEmployee,
          setCurrentStudent,
          currentDrivingSchool,
          currentEmployee,
          currentStudent,
        }}/>
      </View>
    );
  }
}

const mapStateToProps = state => ( {
  currentDrivingSchool: state.context.currentDrivingSchoolID,
  currentEmployee: state.context.currentEmployeeID,
  currentStudent: state.context.currentStudentID,
} );

const mapDispatchToProps = dispatch => ( {
  startup: () => dispatch(StartupActions.startup()),
  setCurrentDrivingSchool: id => dispatch(
    contextActionCreators.setCurrentDrivingSchool(id)),
  setCurrentEmployee: id => dispatch(
    contextActionCreators.setCurrentEmployee(id)),
  setCurrentStudent: id => dispatch(contextActionCreators.setCurrentStudent(id)),
} );

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
